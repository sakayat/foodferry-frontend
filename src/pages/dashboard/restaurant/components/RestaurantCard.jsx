import { MapPin, Mail, Phone } from "lucide-react";

const RestaurantCard = ({ restaurant, handleShowDeleteModal }) => {
  return (
    <div className="relative rounded-lg border border-gray-200 p-6">
      <img
        src={restaurant.cover_image}
        width={56}
        height={56}
        className="mx-auto mb-4 h-14 w-14 rounded-full"
        alt={restaurant.name}
      />
      <h4 className="text-center font-medium uppercase text-gray-900">
        {restaurant.name}
      </h4>
      <h4 className="font-medium text-gray-600">{restaurant.owner}</h4>
      <div className="flex justify-center">
        <div className="text-center">
          <h5 className="text-sm text-gray-800">Total Products</h5>
          <h4 className="mb-2.5 text-lg font-medium text-primary">
            {restaurant.total_foods}
          </h4>
        </div>
      </div>
      <div className="space-y-5">
        <div className="flex gap-3">
          <div>
            <MapPin size={20} />
          </div>
          <p className="text-sm text-gray-700">{restaurant.address}</p>
        </div>
        <div className="flex gap-3">
          <Mail size={20} />
          <p className="text-sm text-gray-700">{restaurant.email}</p>
        </div>
        <div className="flex gap-3">
          <Phone className="h-5 w-5 text-gray-800" />
          <p className="text-sm text-gray-700">{restaurant.phone_number}</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => handleShowDeleteModal(restaurant)}
          className="default-btn rounded py-2 px-6"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
