import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/DashBoard";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/" element={<Navigate to="/dashboard" />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
