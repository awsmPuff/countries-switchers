import React from 'react'
import Homepage from './components/Homepage';
import Country from './components/Country';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App({name, theme}) {
 
  return (
    <div className={`${theme}`}>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/country/:name' element={<Country name={name} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

