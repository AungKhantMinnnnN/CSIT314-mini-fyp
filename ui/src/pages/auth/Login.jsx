import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        console.log('🔵 handleSubmit called'); // Debug log
        console.log('Username:', username, 'Password:', password);

        try{
            var response = await login(username, password);
            console.log('2️⃣ After login call');
            console.log('Full response:', response);
            console.log('Response type:', typeof response);
            console.log('Response.data:', response?.data);
            console.log('Response.success:', response?.success);
            
            if (response.success) {
                console.log(username + " has been signed in.");

                //Check for User Admin Role
                if (response.data.user.userProfileId == 3) {
                    navigate("/user-admin-dash");
                }
            }
        }
        catch (error){
            console.error('❌ Login error caught:', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-indigo-400">Log in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-indigo-400">Username</label>
                        <div className="mt-2">
                        <input id="username" type="text" name="username" required autoComplete="username" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-400 outline-1 -outline-offset-1 outline-black/40 placeholder:text-black focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-indigo-400">Password</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                        </div>
                        </div>
                        <div className="mt-2">
                        <input id="password" type="password" name="password" required autoComplete="password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-400 outline-1 -outline-offset-1 outline-black/40 placeholder:text-black focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                    </div>

                    <div>
                        <button type="button" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;