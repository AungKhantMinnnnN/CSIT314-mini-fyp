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
import CreateUserSuccess from './pages/users/useradmin/createUserSuccess';
import UpdateUser from './pages/users/useradmin/updateUser';
import UpdateUserSuccess from './pages/users/useradmin/updateUserSuccess';
import SuspendUser from './pages/users/useradmin/suspendUser';
import SuspendUserSuccess from './pages/users/useradmin/suspendUserSuccess';

// User Profiles
import ViewUserProfile from './pages/users/userprofile/viewUserProfile';
import CreateProfile from './pages/users/userprofile/createProfile';
import CreateProfileSuccess from './pages/users/userprofile/createProfileSuccess'
import UpdateProfile from './pages/users/userprofile/updateProfile';
import UpdateProfileSuccess from './pages/users/userprofile/updateProfileSuccess';
import SuspendProfile from './pages/users/userprofile/suspendProfile';
import SuspendProfileSuccess from './pages/users/userprofile/suspendProfileSuccess';

// CSR
import ViewAllRequests from './pages/requests/viewAllRequests';
import CreateRequest from './pages/requests/createRequest';
import UpdateRequest from './pages/requests/updateRequest';
import ViewRequestDetails from './pages/requests/viewRequestDetails';
import DeleteRequest from './pages/requests/deleteRequest';

const DashboardRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <PrivateRoute user={user} allowedRoles={[1,2,3,4]}>
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
              <Route path="usermanagement/create" element={<CreateUser />} />
              <Route path="usermanagement/create-success" element={<CreateUserSuccess />} />
              <Route path="usermanagement/update/:userId" element={<UpdateUser />} />
              <Route path="usermanagement/update-success" element={<UpdateUserSuccess />} />
              <Route path="usermanagement/suspend/:userId" element={<SuspendUser />} />
              <Route path="usermanagement/suspend-success" element={<SuspendUserSuccess />} />

              <Route path="userprofiles" element={<ViewUserProfile />} />
              <Route path="userprofiles/create" element={<CreateProfile />} />
              <Route path="userprofiles/create-success" element={<CreateProfileSuccess />} />
              <Route path="userprofiles/update/:profileId" element={<UpdateProfile />} />
              <Route path="userprofiles/update-success" element={<UpdateProfileSuccess />} />
              <Route path="userprofiles/suspend/:profileId" element={<SuspendProfile />} />
              <Route path="userprofiles/suspend-success" element={<SuspendProfileSuccess />} />

              <Route path="viewAllRequests" element={<ViewAllRequests />} />
              <Route path="createRequest" element={<CreateRequest />} />
              <Route path="updateRequest/:requestId" element={<UpdateRequest />} />
              <Route path="viewRequestDetail/:requestId" element={<ViewRequestDetails />} />
              <Route path="deleteRequest/:requestId" element={<DeleteRequest />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
      </Router>
    </>
  )
}

export default App
