import React from 'react';
import { withRouter } from 'react-router';

const AppHeader = ({ account }) => {
  return (
    <div className="app-header-container" id="app-header">
      <div className="app-name">Paraswap Swap</div>
      <div className="metamask-address">{account && account}</div>
    </div>
  );
};

export default withRouter(AppHeader);
