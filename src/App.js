import './App.css';

import { Routes, Route } from 'react-router-dom'

import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import SignIn from './components/SignIn';


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route exact path='/signin' element={<SignIn/>} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
