import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/pages/Auth/Register";
import Login from "./components/pages/Auth/Login";
import HomePage from "./components/pages/HomePage";
import PrivateRoute from "./components/pages/PrivateRoutes";
import BlogDetails from "./components/pages/BlogDetails";
import SearchBlog from "./components/pages/SearchBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <HomePage />{" "}
            </PrivateRoute>
          }
        />
        <Route path="/blog/:id" element={<BlogDetails />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/search" element={<SearchBlog />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
