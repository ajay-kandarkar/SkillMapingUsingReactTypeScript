import Login from './Componenets/Login';
import Registration from './Componenets/Registration';
import { Route,Routes } from 'react-router-dom';
import RegistrationConfirm from './Componenets/RegistrationConfirm';
import Home from './Componenets/Home';
function App() {
  return (
      <>
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<Login />} />
      <Route path="/confirmRegister/:userId" element={<RegistrationConfirm />} />
      <Route  path="/home" element={<Home/>}/>
    </Routes>
      </>
  );
}

export default App;
