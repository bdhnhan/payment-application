import ReactDOM from 'react-dom/client';
import { Routes, Route, redirect } from 'react-router-dom';

import Login from './components/login/Login';
import Nav from './components/Header';
import Home from './components/homePage/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
