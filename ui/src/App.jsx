import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import PrivateRoute from "./components/PrivateRoute";
import Login from './pages/auth/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/auth/Dashboard'
import { useAuth } from './hooks/useAuth';


const UserAdminDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // show loader while auth state initializes

  return (
    <PrivateRoute user={user} allowedRoles={[3]}>
      <Dashboard />
    </PrivateRoute>
  );
};

function App() {

  return (

    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Login Page */}
            <Route 
              path="/login" 
              element = {
                        <>
                          <Navbar />
                          <Login />
                        </>
                        } 
            />

            {/* User Admin Dashboard */}
            <Route 
              path="/user-admin-dash" 
              element={<UserAdminDashboard />} 
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
    
  )
}

export default App
