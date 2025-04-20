import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const login = (provider) => {
  window.location.href = `${SERVER_URL}/auth/login/${provider}`;
};

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e1c] font-bebas-neue">
      <div className="bg-[#1a1a2e] text-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img
            src="logo-img.png"
            alt="Logo"
            className="w-40 h-auto object-contain"
          />
        </div>

        <p className="text-center text-gray-400 mb-6">Login with</p>

        <div className="space-y-4">
          <button
            className="w-full bg-[#2d2d44] hover:bg-gray-700 p-3 rounded-lg flex items-center justify-center gap-2 transition duration-200"
            onClick={() => login("github")}
          >
            <FaGithub className="text-white" />
            Github
          </button>

          <button
            className="w-full bg-[#3b5998] hover:bg-blue-800 p-3 rounded-lg flex items-center justify-center gap-2 transition duration-200"
            onClick={() => login("facebook")}
          >
            <FaFacebook className="text-white" />
            Facebook
          </button>

          <button
            className="w-full bg-[#db4437] hover:bg-red-800 p-3 rounded-lg flex items-center justify-center gap-2 transition duration-200"
            onClick={() => login("google")}
          >
            <FaGoogle className="text-white" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
