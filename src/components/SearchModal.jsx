import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const SearchModal = ({ isSearchModalOpen, setIsSearchModalOpen }) => {

  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchItem) {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/restaurant/search-food/?search=${searchItem}`
        );
        const data = await res.json();
        setSearchResults(data.results);
      } else {
        setSearchResults([]);
      }
    };
    fetchSearchResults();
  }, [searchItem]);

  const handleItemClick = (slug) => {
    setIsSearchModalOpen(false);
    navigate(`/food/${slug}/`);
  };

  return (
    <>
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-start z-50">
          <div className="bg-white p-6 rounded w-96 h-screen overflow-y-auto relative">
            <div className="flex items-center justify-between pb-3">
              <h2 className="text-xl font-bold">Search</h2>
              <button
                className="py-3 rounded"
                onClick={() => setIsSearchModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <input
              type="text"
              className="py-3 px-6 border border-black w-full outline-none placeholder-gray-600 focus:border-gray-300 rounded"
              placeholder="Search your favorite foods..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            {searchItem && (
              <div className="bg-white border border-gray-300 rounded mt-2 w-full">
                <div>
                  {searchResults?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleItemClick(item.slug)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-gray-500">${item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
