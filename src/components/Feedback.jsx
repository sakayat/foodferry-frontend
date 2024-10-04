import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = ({ slug }) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);

  const [feedbacks, setFeedBacks] = useState([]);

  useEffect(() => {
    fetchFeedbackList();
  }, []);

  const fetchFeedbackList = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/restaurant/feedback-list/${slug}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await res.json();

    setFeedBacks(data);
  };

  const handleChangeRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/feedback/${slug}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ comment, rating }),
      }
    );

    if (!token) {
      return navigate("/sign-in/");
    }

    fetchFeedbackList();
  };

  return (
    <div className="py-5">
      <div className="mt-5">
        <div className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span>Comments</span>
          <span className="h-7 w-7 flex items-center justify-center text-lg bg-black text-white rounded">
            {feedbacks.length}
          </span>
        </div>
        {feedbacks?.map((item) => (
          <div key={item.id} className="border-b border-gray-200 py-4">
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">
                {item.first_name || item.username}
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < item.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{item.comment}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="text-xl font-semibold mb-2">Leave a Comment</h3>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300  outline-none resize-none"
            rows="3"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i + 1}
                  className={`w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-400 ${
                    rating == i + 1 ? "text-yellow-400" : ""
                  }`}
                  onClick={() => handleChangeRating(i + 1)}
                />
              ))}
            </div>
            <button className="default-btn py-3 px-8 w-44">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
