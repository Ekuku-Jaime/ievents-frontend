import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children, roles }) => {
  // const auth = useAuth();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // eslint-disable-next-line no-unneeded-ternary
  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;
  console.log(userHasRequiredRole, 'awu');

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoutes;
