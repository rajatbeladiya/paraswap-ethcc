import React from 'react';
import {
  Button,
  Input,
  Dropdown,
  Popup,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';

import GoogleLoader from '../../../shared/components/GoogleLoader';

const Landing = ({
  priceRoute, tokenList, token0, token1,
  handleChangeforFirstToken, handleChangeforSecondToken,
  handleState, convert, reverseToken, addQty, paraswapTrade,
  firstToken, secondToken, token1Loading, loading, slippage,
}) => (
  <div className="paraswap">
    <BlockUI
      tag="div"
      blocking={loading}
      loader={<GoogleLoader height={50} width={50} />}
      className="full-screen"
    >
      <div className="transfer-wrapper card">
        <h4 className="title">Swap Token</h4>
        <div className="transfer-content">
          <div className="from-content">
            <h3>From :</h3>
            <Input
              label={(
                <Dropdown
                  options={tokenList}
                  defaultValue={firstToken}
                  className="from-token"
                  value={token0.symbol || firstToken}
                  onChange={handleChangeforFirstToken}
                />
              )}
              labelPosition="left"
              placeholder="0"
              value={addQty}
              onChange={(event) => {
                handleState({ addQty: event.target.value }, () => { convert(); });
              }}
            />
          </div>
          <div
            className="middle-content"
            role="presentation"
            onClick={() => reverseToken()}
          >
            <Popup
              trigger={<i className="change_arrow" />}
              content="Click to swap"
              basic
              position="bottom center"
            />
          </div>
          <div className="to-content">
            <h3>To :</h3>
            <BlockUI
              tag="div"
              blocking={token1Loading}
              loader={<GoogleLoader height={50} width={50} />}
              className="full-screen"
            >
              <Input
                label={(
                  <Dropdown
                    options={tokenList}
                    defaultValue={secondToken}
                    className="from-token"
                    value={token1.symbol || secondToken}
                    onChange={handleChangeforSecondToken}
                  />
                )}
                labelPosition="left"
                placeholder="0"
                id="demo"
                value={priceRoute.destAmount && (priceRoute.destAmount / 10 ** token1.decimals)}
              />
            </BlockUI>
          </div>
        </div>
        <div className="transfer-footer">
          <Button
            primary
            bsStyle="primary"
            type="submit"
            onClick={(event) => paraswapTrade(event)}
            className="transfer-button"
          >
            Swap
          </Button>
        </div>
      </div>
      <div className="swap-details">
        <div className="label estimated-cost">
          <div>Estimated Cost</div>
          <div className="value">~${priceRoute.bestRouteGasCostUSD}</div>
        </div>
        <div className="label slippage">
          <div>Slippage</div>
          <div className="value">{slippage}%</div>
        </div>
        <div className="label minimum-received">
          <div>Minimum Received</div>
          <div className="value">{priceRoute.priceWithSlippage && (priceRoute.priceWithSlippage / 10 ** token1.decimals)} {token1.symbol}</div>
        </div>
      </div>
    </BlockUI>
  </div>
);

Landing.propTypes = {
  priceRoute: PropTypes.instanceOf(Object),
  tokenList: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  token1Loading: PropTypes.bool,
};

Landing.defaultProps = {
  priceRoute: {},
  tokenList: [],
  loading: false,
  token1Loading: false,
};

export default Landing;
