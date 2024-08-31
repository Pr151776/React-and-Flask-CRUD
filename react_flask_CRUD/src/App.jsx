import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Home } from './Components/Home';
import { AddUser } from './Components/AddUser';
import { Update } from './Components/Update';

export const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='user/:id/update' element={<Update />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
