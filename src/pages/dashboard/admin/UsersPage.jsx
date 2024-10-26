import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";


const UsersPage = () => {
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;
  const [users, setUsers] = useState([]);

  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    setUsers(data.results);
    setPagination({
      count: data.count,
      next: data.next,
      prev: data.previous,
    });
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (pagination.next) {
      setCurrentPage((currPage) => currPage + 1);
    }
  };

  const previousPage = (e) => {
    e.preventDefault();
    if (pagination.prev) {
      setCurrentPage((currPage) => currPage - 1);
    }
  };

  const totalPages = Math.ceil(pagination.count / 6);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-5">
      <div className="py-5">
        <h2 className="text-3xl">All Users</h2>
      </div>
      <div className="user-list">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  email
                </th>
                <th scope="col" className="px-6 py-3">
                  phone_number
                </th>
                <th scope="col" className="px-6 py-3">
                  role
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {users?.map((user) => (
              <tbody key={user.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.username}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone_number}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 space-x-3">
                    <button className="text-green-600 hover:text-red-800">
                      <Link to={`update-role/${user.id}/`}>
                        <Edit size={18} />
                      </Link>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="py-5">
          <Pagination
            pagination={pagination}
            previousPage={previousPage}
            nextPage={nextPage}
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
