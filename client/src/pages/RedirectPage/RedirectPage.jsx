import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoaderPage from 'components/LoaderPage';
import { setUserToken } from 'redux/slice/slice-user';
import { routesPaths } from 'routerSettings/routesPaths';

function RedirectPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    dispatch(setUserToken({ token, isAuth: true }));
    navigate(routesPaths.loginPage, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoaderPage />;
}

export default RedirectPage;
