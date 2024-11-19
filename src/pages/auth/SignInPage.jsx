import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("namemiwe@clip.lat");
  const [password, setPassword] = useState("R6n2wWdLQ2Vw");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  console.log(email, password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/login/`,

      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    setError(data);

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.role === "restaurant_owner") {
        navigate("/restaurant/dashboard");
      } else {
        navigate("/profile");
      }
      window.location.reload();
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRestaurantLogin = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/login/`,

      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: "kaleena944@rustyload.com",
          password: "R6n2wWdLQ2Vw",
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/restaurant/dashboard");
      window.location.reload();
    }
  };

  const handleAdminLogin = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/login/`,

      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: "gaemoccasin@rustyload.com",
          password: "R6n2wWdLQ2Vw",
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/admin/dashboard");
      window.location.reload();
    }
  };

  return (
    <div className="login__page">
      <div className="max-w-2xl mx-auto px-8">
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
          <div className="flex flex-col w-full">
            <div className="py-5">
              <h1 className="text-3xl text-center">Sign In</h1>
            </div>
            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                className="py-3 px-6 border border-black rounded w-full outline-none placeholder-gray-600 focus:border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="py-3 px-6 border border-black rounded w-full outline-none placeholder-gray-600 focus:border-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <div className="show__password absolute top-4 right-0 px-6">
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
                  <button></button>
                </div>
              </div>
              {error && (
                <p className="py-1 text-rose-500">
                  {error.email || error.password || error.error}
                </p>
              )}
              <button className="default-btn rounded w-fit mx-auto py-3 px-8">
                Submit
              </button>
            </form>
            <div className="form__footer border-t border-black/40 py-3 mt-5">
              <div className="flex justify-between">
                <Link to="/forget-password" className="">
                  Forget Password
                </Link>
                <Link to="/sign-up" className="">
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="py-5 flex gap-5">
              <button
                className="py-3 px-6 border border-black rounded"
                onClick={(e) => handleRestaurantLogin(e)}
              >
                Restaurant Login
              </button>
              <button
                className="py-3 px-6 border border-black rounded"
                onClick={(e) => handleAdminLogin(e)}
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
