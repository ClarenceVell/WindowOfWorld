import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'

import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import Subscribe from './pages/Subscribe';
import AddBook from './pages/Admin/AddBook';
import DetailBookAdmin from './pages/Admin/DetailBookAdmin';
import Transaction from './pages/Admin/Transaction';
import ReadBook from './pages/ReadBook';
import UpdateProfile from './pages/UpdateProfile';
import AdminHome from './pages/Admin/AdminHome';
import Logout from './helpers/Logout';

import { API, setAuthToken } from './helpers/config/api';
import { UserContext } from './helpers/context/userContext';

// Init token on axios every time the app is refreshed 
if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  const navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {

    if(!state.login){
      navigate('/auth')
    } else{
      if(state.user.role === 0){
        navigate('/')
      } else {
        navigate('/admin')
      }
    }
  },[state])

  const authUser = async () => {
    try {
      const response = await API.get("/authuser");

      if (response.status === 404) {
        return dispatch({
          type: "failed",
        });
      }

      if (response.data.data.user.role === 0) {
        let payload = response.data.data.user;
        payload.token = localStorage.token;
        return dispatch({
          type: "success",
          payload,
        });

      } else {
        let payload = response.data.data.user;
        payload.token = localStorage.token;
        return dispatch({
          type: "admin",
          payload,
        });
      }

    } catch (error) {
      console.log(error);
      dispatch({
        type: "failed",
      });
    }
  };

  useEffect(() => {
    authUser();
  }, []);


  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/auth' element={<Landing/>} />
        <Route exact path='/detail/:id' element={<Detail/>} />
        <Route exact path='/profile/:id' element={<Profile/>} />
        <Route exact path='/Subscribe' element={<Subscribe/>} />
        <Route exact path='/add' element={<AddBook/>} />
        <Route exact path='/transaction' element={<Transaction/>} />
        <Route exact path='/read/:id' element={<ReadBook/>} />
        <Route exact path='/edit-profile/:id' element={<UpdateProfile/>} />
        <Route exact path='/detail-admin/:id' element={<DetailBookAdmin/>} />
        <Route exact path='/admin' element={<AdminHome/>} />
        <Route exact path='/logout' element={<Logout/>} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
