import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userObj = {
      username,
      email,
      password,
      confirm_password: confirmPassword,
    };
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/register/`,

      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userObj),
      }
    );

    const data = await res.json();
    setError(data);

    if (res.ok) {
      navigate("/sign-in/");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login__page">
      <div className="max-w-2xl mx-auto px-8">
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
          <div className="flex flex-col w-full">
            <div className="py-5">
              <h1 className="text-3xl text-center">Sign Up</h1>
            </div>
            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="py-3 px-6 border border-black w-full outline-none placeholder-gray-600 focus:border-gray-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type="email"
                className="py-3 px-6 border border-black w-full outline-none placeholder-gray-600 focus:border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <div className="relative password">
                <input
                  type={showPassword ? "text" : "password"}
                  className="py-3 px-6 border border-black w-full outline-none placeholder-gray-600 focus:border-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <div className="absolute top-4 right-0 px-6">
                  <div
                    onClick={() => handleShowPassword()}
                    className=" cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </div>
                </div>
              </div>
              <div className="relative confirm-password">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="py-3 px-6 border border-black w-full outline-none placeholder-gray-600 focus:border-gray-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <div className="absolute top-4 right-0 px-6">
                  <div
                    onClick={() => handleShowConfirmPassword()}
                    className="cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </div>
                </div>
              </div>
              {error && (
                <p className="py-1 text-rose-500">
                  {error.username || error.password || error.error}
                </p>
              )}
              <button className="default-btn rounded w-fit mx-auto py-3 px-8">
                Submit
              </button>
            </form>
            <div className="form__footer border-t border-black/40 py-3 mt-5">
              <div className="">
                <Link to="/sign-in/" className="flex justify-end">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
