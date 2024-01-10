import React from 'react';
import Registration from './Componenets/Registration';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
      <>
       <Routes>
      <Route path="/registration" element={<Registration/>}></Route>
      </Routes> 
      </>
  );
}

export default App;
