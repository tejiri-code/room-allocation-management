// src/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">
          Welcome to RoomSwift
        </h1>
        <p className="text-gray-700">
          Manage your rooms efficiently with our system.
        </p>
      </header>
      <section className="flex justify-center items-center">
      <img
          src="https://img.icons8.com/external-smashingstocks-thin-outline-smashing-stocks/100/external-Prototype-engineering-smashingstocks-thin-outline-smashing-stocks.png" // Update the path to your image
          alt="Room Allocation Illustration"
          className=" max-w-2xl"
        />
      </section>
      <nav className="text-center mt-8">
        <Link
          to="/Login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Started
        </Link>
      </nav>
    </div>
  );
};

export default Home;
