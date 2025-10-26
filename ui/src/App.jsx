import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import Login from './pages/auth/Login';
import LogOut from './pages/auth/Logout';
import Dashboard from './pages/auth/Dashboard'
import ViewUser from "./pages/users/viewUser";
import CreateUser from "./pages/users/createUser";
import UpdateUser from "./pages/users/updateUser";
import SuspendUser from './pages/users/suspendUser';
import SuspendSuccess from './pages/users/supendSuccess';
import { useAuth } from './hooks/useAuth';


const DashboardRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // show loader while auth state initializes

  return (
    <PrivateRoute user={user} allowedRoles={[2,3]}>
      <Dashboard user={user}/>
    </PrivateRoute>
  );
};

function App() {

  return (

    <>
      <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element = {<Login />} />
            <Route path="/logout" element={<LogOut />} />

            {/* Dashboard Layout */}
            <Route 
              path="/dashboard/*"
              element={<DashboardRoute />}
            >
              {/* Nested Routes for dashboard */}
              <Route path="view" element={<ViewUser />} />
              <Route path="create" element={<CreateUser />} />
              <Route path="update/:userId" element={<UpdateUser />} />
              <Route path="suspend/:userId" element={<SuspendUser />} />
              <Route path="suspend-success" element={<SuspendSuccess />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
      </Router>
    </>
    
  )
}

export default App
