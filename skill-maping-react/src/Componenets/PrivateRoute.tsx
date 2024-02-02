import {Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
interface Props {
    children: any;
}
function PrivateRoute({ children }: Props) {
    const token = useSelector((state: any) => state.auth.token);
    return token ? children : <Navigate to={'/'} />;
}
export default PrivateRoute;


