import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import AuthBox from "./pages/AuthBox";
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import PostList from "./pages/PostList";
import Layout from "./components/Layout";
import PostDetail from "./pages/PostDetail";
import EditPost from './pages/EditPost';



const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

const MainLayout = () => (
  <Layout>
    {(category) => <Outlet context={{ category }} />}
  </Layout>
);

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<AuthBox />} />

      {/* Private routes with fixed top bar layout */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/edit-post/:id" element={<EditPost />} />


        </Route>
      </Route>
    </Routes>
  );
}

export default App;
