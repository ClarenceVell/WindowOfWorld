import './App.css';

import { Routes, Route } from 'react-router-dom'

import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import Subscribe from './pages/Subscribe';
import AddBook from './pages/AddBook';
import Transaction from './pages/Transaction';
import ReadBook from './pages/ReadBook';


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/auth' element={<Landing/>} />
        <Route exact path='/detail/:id' element={<Detail/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route exact path='/Subscribe' element={<Subscribe/>} />
        <Route exact path='/add' element={<AddBook/>} />
        <Route exact path='/transaction' element={<Transaction/>} />
        <Route exact path='/read' element={<ReadBook/>} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
