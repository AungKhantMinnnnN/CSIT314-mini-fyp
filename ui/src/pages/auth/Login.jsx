import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.svg";
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuspended, setIsSuspended] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Reusable error dialog
  const showErrorDialog = (message) => {
    alert(`Error: ${message}`);
  };

  const handleLoginSubmit = async (e) => {
  e.preventDefault();

  // --- Check for empty fields ---
  if (!username || !password) {
    showErrorDialog("Please fill in both username and password before logging in.");
    return;
  }

  try {
    const response = await login(username, password);

    if (response.success) {
      const userRole = response.data.user.userProfileId;
      const userStatus = response.data.user.userStatusId;

      if (userStatus === 2) {
        // Suspended account
        showErrorDialog("Your account has been suspended. Please contact an administrator.");
        return;
      }

      if (userRole !== 0) {
        console.log(`${username} has been logged in successfully.`);
        navigate("/dashboard");
      }
    } else {
      // API returned success: false
      showErrorDialog("Invalid credentials. Please check your username or password.");
    }

  } catch (error) {
    console.error("An error has occurred while trying to login. Error:", error);
    showErrorDialog("An unexpected error occurred. Please check your network or credentials.");
  }
};


  return (
    <div className="min-h-screen bg-indigo-900 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-2xl p-16 w-full max-w-lg">
        <div className="flex justify-center">
          <img src={Logo} alt="converge" className="font-bold text-xl text-gray-800" />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-indigo-400">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  name="username"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-400 outline-1 -outline-offset-1 outline-black/40 placeholder:text-black focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-indigo-400">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-400 outline-1 -outline-offset-1 outline-black/40 placeholder:text-black focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={handleLoginSubmit}
              >
                Login
              </button>
            </div>

            {/* Suspended message */}
            {isSuspended && (
              <p className="text-red-600 text-center font-medium mt-4">
                Your account has been suspended. Please contact an administrator.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
