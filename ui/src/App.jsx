import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { useAuth } from './hooks/useAuth';
import Login from './pages/auth/Login';
import LogOut from './pages/auth/Logout';
import Dashboard from './pages/auth/Dashboard';
import PrivateRoute from './components/PrivateRoute';

// User Management
import ViewUser from './pages/users/useradmin/viewUser';
import CreateUser from './pages/users/useradmin/createUser';
import CreateSuccess from './pages/users/useradmin/createSuccess';
import UpdateUser from './pages/users/useradmin/updateUser';
import UpdateSuccess from './pages/users/useradmin/updateSuccess';
import SuspendUser from './pages/users/useradmin/suspendUser';
import SuspendSuccess from './pages/users/useradmin/suspendSuccess';

// User Profiles
import ViewUserProfile from './pages/users/userprofile/viewUserProfile';


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

              <Route path="userprofiles" element={<ViewUserProfile />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
      </Router>
    </>
  )
}

export default App
