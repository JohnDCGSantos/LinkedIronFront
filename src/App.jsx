import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import CreatePostPage from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPost";
import Error from "./pages/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Feed/" element={<Feed />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/posts/:postId/edit" element={<EditPostPage />} />

        <Route path="/Profile" element={<Profile />} />
        <Route path="/NewPost" element={<CreatePostPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
