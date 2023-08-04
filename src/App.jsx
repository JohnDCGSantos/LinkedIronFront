import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Error from './pages/Error'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Feed/:userId' element={<Feed />} /> {/* isprivate */}
        <Route path='/Profile' element={<Profile />} /> {/* isprivate */}
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App