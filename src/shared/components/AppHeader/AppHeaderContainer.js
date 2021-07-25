import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppHeader from './AppHeader';

class AppHeaderContainer extends Component {
  render() {
    return (
      <AppHeader account={this.props.account} />
    )
  }
}

AppHeaderContainer.propTypes = {
  account: PropTypes.string,
};

AppHeaderContainer.defaultProps = {
  account: '',
};

const mapStateToProps = state => ({
  account: state.landing.account,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);
