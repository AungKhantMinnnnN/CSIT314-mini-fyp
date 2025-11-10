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
import ViewAllRequests from './pages/csr_pin/viewAllRequests';
import CreateRequest from './pages/csr_pin/createRequest';
import CreateRequestSuccess from './pages/csr_pin/createRequestSuccess';
import UpdateRequest from './pages/csr_pin/updateRequest';
import UpdateRequestSuccess from './pages/csr_pin/updateRequestSuccess';
import ViewRequestDetails from './pages/csr_pin/viewRequestDetails';
import DeleteRequest from './pages/csr_pin/deleteRequest';
import DeleteRequestSuccess from './pages/csr_pin/deleteRequestSuccess';
import ViewShortlistRequest from './pages/csr_pin/viewShortlistRequests';
import ViewCompletedRequest from './pages/csr_pin/viewCompletedRequests';

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
              {/* View/Search Users Page */}
              <Route path="usermanagement" element={<ViewUser />} />
              {/* Create Users Pages */} 
              <Route path="usermanagement/create" element={<CreateUser />} />
              <Route path="usermanagement/create-success" element={<CreateUserSuccess />} />
              {/* Update Users Pages */} 
              <Route path="usermanagement/update/:userId" element={<UpdateUser />} />
              <Route path="usermanagement/update-success" element={<UpdateUserSuccess />} />
              {/* Suspend Users Pages */} 
              <Route path="usermanagement/suspend/:userId" element={<SuspendUser />} />
              <Route path="usermanagement/suspend-success" element={<SuspendUserSuccess />} />

              {/* View/Search UserProfiles Page */}
              <Route path="userprofiles" element={<ViewUserProfile />} />
              {/* Create UserProfiles Page */}
              <Route path="userprofiles/create" element={<CreateProfile />} />
              <Route path="userprofiles/create-success" element={<CreateProfileSuccess />} />
              {/* Update UserProfiles Page */}
              <Route path="userprofiles/update/:profileId" element={<UpdateProfile />} />
              <Route path="userprofiles/update-success" element={<UpdateProfileSuccess />} />
              {/* Suspend UserProfiles Page */}
              <Route path="userprofiles/suspend/:profileId" element={<SuspendProfile />} />
              <Route path="userprofiles/suspend-success" element={<SuspendProfileSuccess />} />
              
              {/* View/Search Categories Page */}
              <Route path="platformmanagement" element={<ViewCategory />} />
              {/* Create Categories Page */}
              <Route path="platformmanagement/create" element={<CreateCategory />} />
              <Route path="platformmanagement/create-success" element={<CreateCategorySuccess />} />
              {/* Update Categories Page */}
              <Route path="platformmanagement/update/:categoryId" element={<UpdateCategory />} />
              <Route path="platformmanagement/update-success" element={<UpdateCategorySuccess />} />
              {/* Suspend Categories Page */}
              <Route path="platformmanagement/suspend/:categoryId" element={<SuspendCategory />} />
              <Route path="platformmanagement/suspend-success" element={<SuspendCategorySuccess />} />
              
              {/* View/Search and check Views/Shortlisted Count for individual PIN request Page */}
              <Route path="pin" element={<ViewAllRequests />} />
              {/* View individual PIN request detail Page */}
              <Route path="pin/viewRequestDetail/:requestId" element={<ViewRequestDetails />} />
              {/* View completed individual PIN request detail Page */}
              <Route path="pin/viewCompletedRequest" element={<ViewCompletedRequest />} />
              {/* Create new individual PIN request Page */}
              <Route path="pin/createRequest" element={<CreateRequest />} />
              <Route path="pin/create-success" element={<CreateRequestSuccess />} />
              {/* Update individual PIN request Page */}
              <Route path="pin/updateRequest/:requestId" element={<UpdateRequest />} />
              <Route path="pin/update-success" element={<UpdateRequestSuccess />} />
              {/* Delete individual PIN request Page */}
              <Route path="pin/deleteRequest/:requestId" element={<DeleteRequest />} />
              <Route path="pin/delete-success" element={<DeleteRequestSuccess />} />
              
              {/* View/Search CSR Requests Page */}
              <Route path="csr" element={<ViewAllRequests />} />
              <Route path="csr/viewShortlistRequest" element={<ViewShortlistRequest />} />
              {/* View CSR request detail Page */}
              <Route path="csr/viewRequestDetail/:requestId" element={<ViewRequestDetails />} />
              {/* View completed CSR request Page */}
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
