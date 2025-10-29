import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { useAuth } from './hooks/useAuth';
import Login from './pages/auth/Login';
import LogOut from './pages/auth/Logout';
import Dashboard from './pages/auth/Dashboard';
import PrivateRoute from './components/PrivateRoute';

// User Management
import ViewUser from './pages/users/viewUser';
import CreateUser from './pages/users/createUser';
import CreateSuccess from './pages/users/createSuccess';
import UpdateUser from './pages/users/updateUser';
import UpdateSuccess from './pages/users/updateSuccess';
import SuspendUser from './pages/users/suspendUser';
import SuspendSuccess from './pages/users/suspendSuccess';



const DashboardRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

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

            {/* Dashboard Routes */}
            <Route 
              path="/dashboard/*"
              element={<DashboardRoute />}
            >
              <Route path="usermanagement" element={<ViewUser />} />
              <Route path="create" element={<CreateUser />} />
              <Route path="create-success" element={<CreateSuccess />} />
              <Route path="update/:userId" element={<UpdateUser />} />
              <Route path="update-success" element={<UpdateSuccess />} />
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
