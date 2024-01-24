import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function PrivateRoute(props: any) {
    const token = useSelector((state: any) => state.auth.token);
    return token ? <Outlet /> : <Navigate to={'/'} />
}

export default PrivateRoute


