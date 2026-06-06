import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import StoreList from "./pages/user/StoreList";
import AddStore from "./pages/admin/AddStore";
import Dashboard from "./pages/admin/Dashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        {/* USER */}

        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />


        {/* OWNER */}

        <Route
          path="/owner"
          element={
            <ProtectedRoute role="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

<Route
  path="/stores"
  element={
    <ProtectedRoute role="user">

      <StoreList />

    </ProtectedRoute>
  }
/>
<Route
  path="/add-store"
  element={
    <ProtectedRoute role="admin">

      <AddStore />

    </ProtectedRoute>
  }
/>
      </Routes>

    </BrowserRouter>

  );
}

export default App;