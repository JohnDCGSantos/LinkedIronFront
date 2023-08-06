import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Error from './pages/Error'
/* import isPrivate from "./components/isPrivate";
 */ /* import Navbar from './components/Navbar'; */

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Feed/:userId' element={<Feed />} />

        <Route path='/Profile/:userId' element={<Profile />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
