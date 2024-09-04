import { Link } from "react-router-dom";
import notFoundImg from "../assets/images/not-found.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <img className="mx-auto" src={notFoundImg} alt="" />
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          Oops! No Data Found
        </h1>
        <p className="text-xl text-gray-600 text-center">
          It seems like there's no data available in this category. Please check
          back later or explore other categories.
        </p>
        <Link
          to="/"
          className="block default-btn py-3 px-6 rounded text-center"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
