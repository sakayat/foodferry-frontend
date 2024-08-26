import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const BreadCrumbs = ({ link_name }) => {
  return (
    <div className="breadcrumbs">
      <ul className="flex items-center gap-1">
        <li className="text-gray-600">
          <Link to="/" className="">
            Home
          </Link>
        </li>
        <li>
          <ChevronRight size={15} />
        </li>
        <li>
          <Link to="">{link_name}</Link>
        </li>
      </ul>
    </div>
  );
};

export default BreadCrumbs;
