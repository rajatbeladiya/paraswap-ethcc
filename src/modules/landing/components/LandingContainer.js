import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Landing from './Landing';
import * as landingActions from '../redux/actions';
import { noop, getWeb3, getERCContractInstance } from '../../../utils';
import { showNotification } from '../../../utils/Notifications';
import { BASE_URL } from '../../../config';
import axios from 'axios';

const BN = require('bignumber.js');

class LandingContainer extends Component {

  state = {
    firstToken: 'USDT',
    secondToken: 'ETH',
    token0: {},
    token1: {},
    addQty: 1,
    side: 'SELL',
    networkId: 1,
    slippage: 1,
    web3: '',
    account: '',
    NULL_ADDRESS: '0x0000000000000000000000000000000000000000',
    referrer: 'paraswap-swap',
    spenderAddress: '0xb70Bc06D2c9Bf03b3373799606dc7d39346c06B3',
    MAX_ALLOWANCE: '123123442345235562344256956453452345745678845678896456039457584007913129639935',
    loading: false,

  }

  async componentDidMount() {
    this.props.getTokenList(this.state.networkId);
    await window.ethereum.enable();
    const web3 = await getWeb3();
    this.setState({ web3 });
    const [account] = await web3.eth.getAccounts();
    this.setState({ account });
    this.props.setAccountAddress(account);
    
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.tokens) !== JSON.stringify(nextProps.tokens)) {
      const tokenList = nextProps.tokens.length > 0 && nextProps.tokens.map(token => {
        return {
          text: (
            <div>
              <img src={token.img} className="ui avatar image" alt="coin" />
              {token.symbol}
            </div>
          ),
          value: token.symbol,
          details: token
        }
      });
      nextProps.setTokenList(tokenList);
      const token0 = nextProps.tokens.find(token => this.state.firstToken === token.symbol);
      const token1 = nextProps.tokens.find(token => this.state.secondToken === token.symbol);
      this.setState({ token0, token1 }, async () => {
        this.convert();
      });
    }
  }

  handleState = (value, callback) => {
    this.setState(value, () => {
      if (callback) callback();
    });
  }

  convert = async () => {
    const { token0, token1, networkId, side } = this.state;
    const data = {
      from: token0.address,
      to: token1.address,
      amount: (new BN(this.state.addQty).times(10 ** token0.decimals)),
      fromDecimals: token0.decimals,
      toDecimals: token1.decimals,
      side: side,
      network: networkId
    };
    this.props.getPriceRoute(data);
  }

  handleChangeforFirstToken = (e, { value }) => {
    const token0 = this.props.tokens.find(token => value === token.symbol);
    this.setState({ token0 }, () => this.convert());
  };

  handleChangeforSecondToken = (e, { value }) => {
    const token1 = this.props.tokens.find(token => value === token.symbol);
    this.setState({ token1 }, () => this.convert());
  };

  reverseToken = async () => {
    this.setState((prevState) => ({
      token0: prevState.token1,
      token1: prevState.token0,
    }));
  }

  paraswapTrade = async () => {
    this.setState({ loading: true });
    const { token0, token1, slippage, MAX_ALLOWANCE } = this.state;
    const { priceRoute } = this.props;

    const ercContract = await getERCContractInstance(this.state.web3, token0.address);
    const allowance = await ercContract.methods.allowance(this.state.account, this.state.spenderAddress).call();
    if (allowance < (new BN(this.state.addQty).times(10 ** token0.decimals))) {
      await ercContract.methods.approve(this.state.spenderAddress, MAX_ALLOWANCE).send({ from: this.state.account });
    }

    const srcAmount = new BN(this.state.addQty).times(10 ** token0.decimals).toFixed(0);

    const minAmount = new BN(priceRoute.destAmount).times(1 - slippage / 100).toFixed(0);

    const transaction = await this.buildSwap(token0, token1, srcAmount, minAmount, priceRoute);

    this.state.web3.eth.sendTransaction(
      transaction,
      async (err, transactionHash) => {
        if (err) {
          showNotification('Something went wrong. Please try again later!', 'success', 5000);
          return this.setState({ error: err.toString(), loading: false });
        }
        this.setState({ loading: false });
        showNotification('Swap Successfull!', 'success', 5000);
        console.log('transactionHash=========', transactionHash);
      },
    );
    
  }

  buildSwap = async (from, to, srcAmount, minAmount, priceRoute) => {
    const { account, NULL_ADDRESS, referrer } = this.state;
    const txURL = `${BASE_URL}/transactions/${this.state.networkId}`;

    const txConfig = {
      priceRoute,
      srcToken: from.address,
      srcDecimals: from.decimals,
      destToken: to.address,
      destDecimals: to.decimals,
      srcAmount,
      destAmount: minAmount,
      userAddress: account,
      referrer,
      receiver: NULL_ADDRESS,
    };

    const { data } = await axios.post(txURL, txConfig);

    return data;
  }

  render() {
    const { priceRoute, tokens, tokenList, token1Loading } = this.props;
    const { token0, token1, firstToken, secondToken, slippage, loading } = this.state;
    return (
      <Landing
        priceRoute={priceRoute}
        tokens={tokens}
        tokenList={tokenList}
        token0={token0}
        token1={token1}
        firstToken={firstToken}
        secondToken={secondToken}
        handleChangeforFirstToken={this.handleChangeforFirstToken}
        handleChangeforSecondToken={this.handleChangeforSecondToken}
        reverseToken={this.reverseToken}
        handleState={this.handleState}
        convert={this.convert}
        addQty={this.state.addQty}
        paraswapTrade={this.paraswapTrade}
        token1Loading={token1Loading}
        slippage={slippage}
        loading={loading}
      />
    );
  }
}

LandingContainer.propTypes = {
  priceRoute: PropTypes.instanceOf(Object),
  getPriceRoute: PropTypes.func,
  getTokenList: PropTypes.func,
  setTokenList: PropTypes.func,
  tokens: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  token1Loading: PropTypes.bool,
  setAccountAddress: PropTypes.func,
};

LandingContainer.defaultProps = {
  priceRoute: {},
  getPriceRoute: noop,
  getTokenList: noop,
  setTokenList: noop,
  tokens: [],
  loading: false,
  token1Loading: false,
  setAccountAddress: noop,
};

const mapStateToProps = state => ({
  priceRoute: state.landing.priceRoute,
  tokens: state.landing.tokens,
  tokenList: state.landing.tokenList,
  loading: state.landing.loading,
  token1Loading: state.landing.token1Loading,
});

const mapDispatchToProps = dispatch => ({
  getPriceRoute: data => dispatch(landingActions.getPriceRoute(data)),
  getTokenList: networkId => dispatch(landingActions.getTokenList(networkId)),
  setTokenList: data => dispatch(landingActions.setTokenList(data)),
  setAccountAddress: account => dispatch(landingActions.setAccountAddress(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
