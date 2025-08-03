import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./layouts/layout";
import LoginPage from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import NewBlog from "./pages/newblog/newblog";
import AllBlogs from "./pages/allblogs/allblogs";
import Categories from "./pages/categories/categories";
import Settings from "./pages/settings/settings";
import ProtectedRoute from "./routes/ProtectedRoute";
import AccessDenied from "./pages/access-denied/AccessDenied";
import NotFoundPage from "./pages/404 page/404-page";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Protected Routes with Layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="new-blog" element={<NewBlog />} />
            <Route path="all-blogs" element={<AllBlogs />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
