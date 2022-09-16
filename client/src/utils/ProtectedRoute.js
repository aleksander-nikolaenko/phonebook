import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  const location = useLocation();
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace state={location.pathname} />;
  }

  return children ? children : <Outlet />;
};
