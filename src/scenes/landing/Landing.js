import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';
import { connect } from 'react-redux';

import MainTemplate from '../../shared/templates/MainTemplate/MainTemplateContainer';
import { LandingContainer } from '../../modules/landing';
import GoogleLoader from '../../shared/components/GoogleLoader';

class Landing extends Component {
  render() {
    return (
      <BlockUI
        tag="div"
        blocking={this.props.loading}
        className="full-height"
        loader={<GoogleLoader height={50} width={50} />}
      >
        <MainTemplate>
          <LandingContainer />
        </MainTemplate>
      </BlockUI>
    );
  }
}

Landing.propTypes = {
  loading: PropTypes.bool,
};

Landing.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  loading: state.landing.loading,
});

export default connect(mapStateToProps, null)(Landing);
