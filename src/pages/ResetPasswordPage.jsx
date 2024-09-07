import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const ResetPasswordPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  console.log(error);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("Passwords do not match");
    }

    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/accounts/reset-password/${uid}/${token}/`,

      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          confirm_password: confirmPassword,
        }),
      }
    );

    const data = await res.json();

    setError(data);

    if (data.error?.includes("Invalid token")) {
      setError({
        error:
          "The password reset link has expired. Request a new password reset link",
      });
    }

    if(res.ok){
        return navigate("/sign-in/")
    }
    
  };

  return (
    <div className="login__page">
      <div className="max-w-2xl mx-auto px-8">
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
          <div className="flex flex-col w-full">
            <div className="py-5">
              <h1 className="text-3xl text-center">Change password</h1>
            </div>
            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="py-3 px-6 border border-black w-full outline-none placeholder-gray-600 focus:border-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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
                </div>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="py-3 px-6 border border-black w-full outline-none placeholder-gray-600 focus:border-gray-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
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
                </div>
              </div>
              {error && (
                <p className="py-1 text-rose-500">
                  {error.password || error.confirm_password || error.error}
                </p>
              )}
              <button className="default-btn w-fit mx-auto py-3 px-8">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
