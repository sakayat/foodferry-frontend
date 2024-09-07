import React, { useState } from "react";
import image1 from "../assets/images/sent_mail.png";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/accounts/forget-password/`,

        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        setError("");
        setShowMessage(true);
      }

      const data = await res.json();

      setError(data);
      setLoading(false);
    } catch (error) {
      setError("Server is not connected");
    }
  };

  return (
    <div className="login__page">
      <div className="max-w-2xl mx-auto px-8">
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
          {!showMessage ? (
            <div className="flex flex-col w-full">
              <div className="py-5">
                <h1 className="text-3xl text-center">Restore password</h1>
              </div>
              <form
                className="flex flex-col gap-5 w-full"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  className="py-3 px-6 border border-black w-full outline-none placeholder-gray-600 focus:border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />

                {error && <p className="py-1 text-rose-500">{error.error}</p>}
                <button
                  className={`default-btn w-fit mx-auto py-3 px-8 ${
                    loading ? "opacity-50 cursor-wait" : ""
                  }`}
                  disabled={false}
                >
                  {loading ? "Loading..." : "Recover"}
                </button>
              </form>
            </div>
          ) : (
            <div className=" text-black px-4 py-3 flex flex-col items-center justify-center">
              <img
                src={image1}
                alt="Mail Sent"
                className="w-48 md:w-72 h-full inline-block"
              />
              <div className="flex flex-col gap-3">
                <span className="text-xl md:text-3xl tracking-wider">
                  Account recovery link is sent to email {email}
                </span>
                <span className="md:text-lg">
                  Check mailbox and follow the link in the message to complete
                  password restoration.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
