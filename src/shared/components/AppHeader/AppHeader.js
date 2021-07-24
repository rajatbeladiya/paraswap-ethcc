import React from 'react';
import { withRouter } from 'react-router';

const AppHeader = () => {
  return (
    <div className="app-header-container" id="app-header">
      <div className="app-name">Paraswap Swap</div>
      <div className="logo" id="app-logo">
        {/* <img src={NewAppLogo} alt="logo" /> */}
      </div>
    </div>
  );
};

export default withRouter(AppHeader);
