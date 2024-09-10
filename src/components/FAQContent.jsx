import React from "react";
import FAQItem from "./FAQItem";

const faqData = [
  {
    question: "How does your food delivery service work?",
    answer:
      "Our food delivery service allows you to order food from local restaurants through our app or website. Simply choose your items, place your order, and we'll deliver it to your doorstep.",
  },
  {
    question: "What are your delivery hours?",
    answer:
      "We deliver from 10 AM to 10 PM, seven days a week. However, delivery times may vary depending on the restaurant's operating hours.",
  },
  {
    question: "How much does delivery cost?",
    answer:
      "Delivery fees vary based on your location and the restaurant you're ordering from. The exact fee will be displayed before you complete your order.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, you can track your order in real-time through our app or website once it's been picked up by our delivery partner.",
  },
  {
    question: "What if there's an issue with my order?",
    answer:
      "If you experience any issues with your order, please contact our customer support team through the app or website. We're here to help and will work to resolve any problems as quickly as possible.",
  },
  {
    question: "How can I pay for my order?",
    answer:
      "Currently, we only accept cash on delivery as a payment option. We're working on implementing additional payment methods such as credit/debit cards and digital wallets, which will be available soon. We appreciate your patience as we expand our payment options to serve you better.",
  },
];

import faqImage from "../assets/images/faq.png";

const FAQContent = () => {
  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <div className="py-5">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="">
            {faqData.map((item) => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
          <div className="image hidden lg:flex">
            <img src={faqImage} alt="" className="w-full h-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQContent;
