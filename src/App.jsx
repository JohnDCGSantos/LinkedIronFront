import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import PostDetails from './pages/PostDetails'
import Error from './pages/Error'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
/* import isPrivate from "./components/isPrivate";
 */

function App() {
  return (
    <>
     <Navbar /> 
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Feed/:userId' element={<Feed />} />

        <Route path='/Profile' element={<Profile />} />
        <Route path='/PostDetails' element ={<PostDetails />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
