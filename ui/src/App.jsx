import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { useAuth } from './hooks/useAuth';
import Login from './pages/auth/Login';
import LogOut from './pages/auth/Logout';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

// User Management
import ViewUser from './pages/useradmin/usermanagement/viewUser';
import CreateUser from './pages/useradmin/usermanagement/createUser';
import CreateUserSuccess from './pages/useradmin/usermanagement/createUserSuccess';
import UpdateUser from './pages/useradmin/usermanagement/updateUser';
import UpdateUserSuccess from './pages/useradmin/usermanagement/updateUserSuccess';
import SuspendUser from './pages/useradmin/usermanagement/suspendUser';
import SuspendUserSuccess from './pages/useradmin/usermanagement/suspendUserSuccess';

// User Profiles
import ViewUserProfile from './pages/useradmin/userprofile/viewUserProfile';
import CreateProfile from './pages/useradmin/userprofile/createProfile';
import CreateProfileSuccess from './pages/useradmin/userprofile/createProfileSuccess'
import UpdateProfile from './pages/useradmin/userprofile/updateProfile';
import UpdateProfileSuccess from './pages/useradmin/userprofile/updateProfileSuccess';
import SuspendProfile from './pages/useradmin/userprofile/suspendProfile';
import SuspendProfileSuccess from './pages/useradmin/userprofile/suspendProfileSuccess';

// Profile Management
import ViewCategory from './pages/platformmanagement/viewCategory'
import CreateCategory from './pages/platformmanagement/createCategory';
import CreateCategorySuccess from './pages/platformmanagement/createCategorySuccess';
import UpdateCategory from './pages/platformmanagement/updateCategory';
import UpdateCategorySuccess from './pages/platformmanagement/updateCategorySuccess';
import SuspendCategory from './pages/platformmanagement/suspendCategory';
import SuspendCategorySuccess from './pages/platformmanagement/suspendCategorySuccess';

// PIN
import ViewAllRequests from './pages/pin/viewAllRequests';
import CreateRequest from './pages/pin/createRequest';
import CreateRequestSuccess from './pages/pin/createRequestSuccess';
import UpdateRequest from './pages/pin/updateRequest';
import UpdateRequestSuccess from './pages/pin/updateRequestSuccess';
import ViewRequestDetails from './pages/pin/viewRequestDetails';
import DeleteRequest from './pages/pin/deleteRequest';
import DeleteRequestSuccess from './pages/pin/deleteRequestSuccess';
import ViewShortlistRequest from './pages/pin/viewShortlistRequests';
import ViewCompletedRequest from './pages/pin/viewCompletedRequests';

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

              <Route path="platformmanagement" element={<ViewCategory />} />
              <Route path="platformmanagement/create" element={<CreateCategory />} />
              <Route path="platformmanagement/create-success" element={<CreateCategorySuccess />} />
              <Route path="platformmanagement/update/:categoryId" element={<UpdateCategory />} />
              <Route path="platformmanagement/update-success" element={<UpdateCategorySuccess />} />
              <Route path="platformmanagement/suspend/:categoryId" element={<SuspendCategory />} />
              <Route path="platformmanagement/suspend-success" element={<SuspendCategorySuccess />} />
              
              <Route path="pin" element={<ViewAllRequests />} />
              <Route path="pin/createRequest" element={<CreateRequest />} />
              <Route path="pin/create-success" element={<CreateRequestSuccess />} />
              <Route path="pin/updateRequest/:requestId" element={<UpdateRequest />} />
              <Route path="pin/update-success" element={<UpdateRequestSuccess />} />
              <Route path="pin/viewRequestDetail/:requestId" element={<ViewRequestDetails />} />
              <Route path="pin/deleteRequest/:requestId" element={<DeleteRequest />} />
              <Route path="pin/delete-success" element={<DeleteRequestSuccess />} />
              <Route path="pin/viewShortlistRequests" element={<ViewShortlistRequest />} />
              <Route path="pin/viewCompletedRequest" element={<ViewCompletedRequest />} />

              <Route path="csr" element={<ViewAllRequests />} />
              <Route path="csr/viewShortlistRequest" element={<ViewShortlistRequest />} />
              <Route path="csr/viewCompletedRequest" element={<ViewCompletedRequest />} />
            </Route> 

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
      </Router>
    </>
  )
}

export default App
