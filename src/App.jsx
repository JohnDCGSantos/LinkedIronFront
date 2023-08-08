import './App.css'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import CreatePostPage from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPostPage from './pages/EditPost'
import Error from './pages/Error'
import UsersList from './pages/Users'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />

        <Route
          path='/Feed'
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path='/posts/:postId'
          element={
            <PrivateRoute>
              <PostPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/posts/:postId/edit'
          element={
            <PrivateRoute>
              <EditPostPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/Profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/NewPost'
          element={
            <PrivateRoute>
              <CreatePostPage />
            </PrivateRoute>
          }
        />

        <Route path='/Users' element={<UsersList />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
