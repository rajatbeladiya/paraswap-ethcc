import React from 'react';
import {
  Button,
  Input,
  Dropdown,
  Popup,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Landing = ({
  priceRoute, tokenList, token0, token1,
  handleChangeforFirstToken, handleChangeforSecondToken,
  handleState, convert, reverseToken, addQty, paraswapTrade,
  firstToken, secondToken
}) => (
  <div className="paraswap">
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
          {console.log('token1======', token1)}
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
        </div>
      </div>
      <div className="transfer-footer">
        <Button
          primary
          bsStyle="primary"
          type="submit"
          // loading={swapLoadding}
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
      <div className="label minimum-received">
        <div>Minimum Received</div>
        <div className="value">{priceRoute.priceWithSlippage && (priceRoute.priceWithSlippage / 10 ** token1.decimals)} {token1.symbol}</div>
      </div>
    </div>
  </div>
);

Landing.propTypes = {
  priceRoute: PropTypes.instanceOf(Object),
  tokenList: PropTypes.instanceOf(Array),
};

Landing.defaultProps = {
  priceRoute: {},
  tokenList: [],
};

export default Landing;
