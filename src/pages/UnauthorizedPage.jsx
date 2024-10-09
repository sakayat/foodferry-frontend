import { Lock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white p-8 text-center space-y-5">
        <Lock className="mx-auto w-16 h-16 text-red-500" />
        <p className="text-gray-600 text-3xl">
          You do not have permission to view this page.
        </p>
        <Link
          to="/profile"
          className="text-blue-500 rounded hover:text-blue-600 inline-block"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
