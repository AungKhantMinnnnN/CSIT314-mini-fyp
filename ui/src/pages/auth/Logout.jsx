import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg"

const LogOut = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5); // 5 seconds before redirect

    useEffect(() => {
        if (countdown === 0){
            navigate("/login", {replace:true});
            return;
        }
        const timerId = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [countdown, navigate]);

    return (
        <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-8 content-center">
            <div className="bg-white rounded-lg shadow-lg p-16 w-full max-w-3xl ">
                {/* Logo here */}
                <img src={Logo} alt="converge" className="font-bold text-xl text-gray-800"></img>

                <div className="flex items-center gap-6 mb-8">
                    {/* Green circle */}
                    <div className="flex-shrink-0"> 
                        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="32" r="30" stroke="#22C55E" strokeWidth="4" fill="none"/>
                            <path d="M20 32L28 40L44 24" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    {/* Success text */}
                    <div className="flex-1">
                        <h1 className="text-4xl text-indigo-600 font-light mb-6">
                            You have logged out successfully.
                        </h1>
                        <p className="text-indigo-400 text-lg mb-2">
                            Thank you for trusting us!
                        </p>
                        <p className="text-indigo-400 text-lg mb-6">
                            We hope you've enjoyed converge!
                        </p>

                        {/* Countdown message */}
                        <p className="text-gray-500 text-md">
                            Redirecting to login in <span className="font-semibold">{countdown}</span> second{countdown !== 1 ? "s" : ""}...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogOut;
