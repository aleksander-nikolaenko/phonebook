import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routesPaths } from 'routerSettings/routesPaths';
import { ProtectedRoute } from 'utils/ProtectedRoute';
import ResponsiveAppBar from './ResponsiveAppBar';
import LoaderPage from './LoaderPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import selectors from 'redux/selectors';
import { currentUser } from 'redux/operations/operations-user';

const HomePage = lazy(() =>
  import('../pages/HomePage' /* webpackChunkName: "home-page" */)
);

const ContactsPage = lazy(() =>
  import('../pages/ContactsPage' /* webpackChunkName: "contacts-page" */)
);
const RegisterPage = lazy(() =>
  import('../pages/RegisterPage' /* webpackChunkName: "register-page" */)
);

const LoginPage = lazy(() =>
  import('../pages/LoginPage' /* webpackChunkName: "login-page" */)
);

export const App = () => {
  const isAuth = useSelector(selectors.getIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<LoaderPage />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path={routesPaths.homePage}
          element={
            <Suspense fallback={<LoaderPage />}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path={routesPaths.contactsPage}
          element={
            <ProtectedRoute
              redirectPath={routesPaths.loginPage}
              isAllowed={isAuth}
            >
              <Suspense fallback={<LoaderPage />}>
                <ContactsPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path={routesPaths.registerPage}
          element={
            <ProtectedRoute
              redirectPath={routesPaths.contactsPage}
              isAllowed={!isAuth}
            >
              <Suspense fallback={<LoaderPage />}>
                <RegisterPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path={routesPaths.loginPage}
          element={
            <ProtectedRoute
              redirectPath={routesPaths.contactsPage}
              isAllowed={!isAuth}
            >
              <Suspense fallback={<LoaderPage />}>
                <LoginPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={routesPaths.homePage} />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
};
