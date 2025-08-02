import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layouts/layout";
import LoginPage from "./pages/login/login";
import AccessDenied from "./pages/access-denied/AccessDenied";
import Dashboard from "./pages/dashboard/dashboard";
import NewBlog from "./pages/newblog/newblog";
import AllBlogs from "./pages/allblogs/allblogs";
import Categories from "./pages/categories/categories";
import Settings from "./pages/settings/settings";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-blog"
            element={
              <ProtectedRoute>
                <Layout>
                  <NewBlog />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-blogs"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllBlogs />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Layout>
                  <Categories />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
