import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../../components/AppHeader/AppHeaderContainer';

const MainTemplate = ({
  children, childrenContainerClassName,
  hideHeader,
}) => (
  <div className="main-template">
    {
      !hideHeader && (
        <AppHeader />
      )
    }
    <div className="main-content">
      <div className={`children-container ${childrenContainerClassName}`}>
        {children}
      </div>
    </div>
  </div>
);

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  childrenContainerClassName: PropTypes.string,
};

MainTemplate.defaultProps = {
  children: <div />,
  className: '',
  childrenContainerClassName: '',
};

export default MainTemplate;
