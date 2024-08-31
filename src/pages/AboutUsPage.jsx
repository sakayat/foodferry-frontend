import React from "react";
import { Utensils, Truck, Clock, Users } from "lucide-react";

const AboutUsPage = () => {
  const data = [
    {
      icon: Utensils,
      title: "Wide Selection",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Lorem Ipsum is simply dummy text of the printing industry.",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "The standard chunk of Lorem Ipsum used since the 1500s.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#286140] text-white py-12">
        <div className="xl:container mx-auto px-8 space-y-3">
          <h1 className="text-4xl font-bold">About DotEats</h1>
          <p className="text-xl">Delivering Happiness, One Meal at a Time</p>
        </div>
      </div>
      <div className="xl:container mx-auto px-8 py-5">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <p className="text-lg mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <p className="text-lg">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old
          </p>
        </div>
        <div className="py-5">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <item.icon className="w-12 h-12 text-[] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg mb-4">
            At DotEats, our mission is to revolutionize the way people
            experience food delivery. We strive to:
          </p>
          <ul className="list-disc list-inside text-lg ml-4 space-y-2">
            <li>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
            </li>
            <li>Contrary to popular belief, Lorem Ipsum is not simply</li>
            <li>Contrary to popular belief, Lorem Ipsum .</li>
            <li>Contrary to popular belief, Lorem Ipsum is.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
