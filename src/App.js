import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/JS/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './Components/JS/ErrorPage';
import RegisterPage from './Components/JS/RegisterPage';
import AdminPannel from './Components/JS/AdminPannel';
import UserPannel from './Components/JS/UserPannel';

function App() {
  return (
  <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/admin' element={<AdminPannel/>}/>
      <Route path='/user' element={<UserPannel/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
