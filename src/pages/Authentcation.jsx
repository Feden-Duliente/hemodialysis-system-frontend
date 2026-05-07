import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Authentcation() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userOtp: "",
    rememberMe: false,
  });

  const { login, register, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = isLogin ? await login(formData) : await register(formData);

    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-700 rounded-lg shadow lg flex items-center justify-center gap-20 p-4">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center gap-4 rounded-[5px] bg-white backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-6 md:p-8 w-full max-w-sm mx-auto">
            <div className="text-center">
              <h2 className="font-semibold text-lg text-[#0c5148] mb-1">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-[12px] text-gray-600">
                {isLogin
                  ? "Please sign in to your account"
                  : "Join Hospital Portal"}
              </p>
            </div>

            {error && (
              <div className="w-full text-center text-red-700 text-[11px]">
                {error}
              </div>
            )}

            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="relative">
                  <input
                    name="username"
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border-[1px] border-gray-200 rounded-[5px] text-[12px] placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-[#0c5148]/30 focus:border-[#0c5148] transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-300"
                    placeholder="Username"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <input
                    name="userOTP"
                    type="text"
                    value={formData.userOTP}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border-[1px] border-gray-200 rounded-[5px] text-[12px] placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-[#0c5148]/50 focus:border-[#0c5148] transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-300"
                    placeholder="One-Time-Password"
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="relative">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border-[1px] border-gray-200 rounded-[5px] text-[12px] placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-[#0c5148]/30 focus:border-[#0c5148] transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-300 pr-12"
                    placeholder="Password"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0c5148] border-gray-300 rounded focus:ring-[#0c5148] focus:ring-1 transition-all duration-200"
                    />
                    <span className="text-[12px] font-medium text-gray-700 select-none">
                      Remember me
                    </span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex item-center justify-center text-[12px] bg-green-800 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-[5px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none "
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animated-spin" />
                    <span>{isLogin ? "Signing In..." : "Creating"}</span>
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <div className="w-full">
              <button
                type="button"
                className="w-full text-[11px] text-center text-[#0c5148]/80 hover:text-[#0c5148] font-medium py-2 px-4 rounded-xl  transition-all"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setFormData({
                    username: "",
                    password: "",
                    userOTP: "",
                    rememberMe: false,
                  });
                }}
              >
                {isLogin
                  ? "Don't have an account?   Register"
                  : "Already have account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
