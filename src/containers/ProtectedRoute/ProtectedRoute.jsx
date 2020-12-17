import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const checkIsRouteAllowed = ({ role, allowedUserGroups }) => {
  if (allowedUserGroups === 'all') return true;

  return allowedUserGroups.some(userRole => userRole === role);
};

const ProtectedRoute = ({ component: Component, auth, location, allowedUserGroups, ...rest }) => {
  const { isAuthenticated, isAuthenticating, role } = { isAuthenticated: true, isAuthenticating: false };
  const isRouteAllowed = checkIsRouteAllowed({ role, allowedUserGroups });

  useEffect(() => {
    // if (!isAuthenticated) validateToken();

    return () => { };
  }, [isAuthenticated]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticating) return <div className="LoaderFlex">Loading...</div>

        if (!isAuthenticated) return <Redirect to='/login' />;

        if (!isRouteAllowed) {
          return <Redirect to='/' />;
        }

        return <Component {...props} />;
      }}
    />
  );
};


ProtectedRoute.defaultProps = {
  location: null,
  component: null,
  allowedUserGroups: 'all',
};

export default connect(
  ({ auth }) => ({ auth }),
)(ProtectedRoute);
