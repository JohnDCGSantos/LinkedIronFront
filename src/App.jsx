import './App.css'
import { Route, Routes } from 'react-router-dom'
import IsPrivate from './components/IsPrivate'
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
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import UsersList from './pages/Users'
import FollowingPage from './pages/FollowingPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/following' element={<FollowingPage />} />

        <Route
          path='/Feed'
          element={
            <IsPrivate>
              <Feed />
            </IsPrivate>
          }
        />
        <Route
          path='/posts/:postId'
          element={
            <IsPrivate>
              <PostPage />
            </IsPrivate>
          }
        />
        <Route
          path='/posts/:postId/edit'
          element={
            <IsPrivate>
              <EditPostPage />
            </IsPrivate>
          }
        />
        <Route
          path='/Profile'
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route
          path='/NewPost'
          element={
            <IsPrivate>
              <CreatePostPage />
            </IsPrivate>
          }
        />

        <Route path='/Users' element={<UsersList />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
