import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkAuthenticated, loadUser } from '../../actions/auth';
import Nav from './Nav';

Layout.propTypes = {
  checkAuthenticated: PropTypes.func,
  loadUser: PropTypes.func,
  children: PropTypes.any
};
function Layout(props) {
  useEffect(() => {
    props.checkAuthenticated();
    props.loadUser();
  }, []);

  return (
    <div>
      <Nav />
      {props.children}
    </div>
  );
}
export default connect(null, { checkAuthenticated, loadUser })(Layout);
