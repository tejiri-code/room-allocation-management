// src/App.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SchedulingCalendar from "./SchedulingCalendar";

function Allocation() {
  
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: "",
    guestName: "",
    checkIn: "",
    checkOut: "",
    guestContact: "",
    roomType: "Standard", // Default room type
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRoom = async () => {
    
    console.log(formData);
    // Check if required fields are provided
    if (
      !formData.guestName ||
      !formData.roomNumber ||
      !formData.checkIn ||
      !formData.checkOut ||
      !formData.guestContact
    ) {
      console.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8082/createReservation",
        {
          roomNumber: formData.roomNumber,
          checkInDate: formData.checkIn,
          checkOutDate: formData.checkOut,
          guestName: formData.guestName,
          guestContact: formData.guestContact,
          roomType: formData.roomType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        setRooms([...rooms, response.data.data]);
        setFormData({
          roomNumber: "",
          guestName: "",
          checkIn: "",
          checkOut: "",
          guestContact: "",
          roomType: "Standard", // Reset room type to default after adding a room
        });
      } else {
        console.error("Reservation failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    if (
      formData.roomNumber &&
      formData.guestName &&
      formData.checkIn &&
      formData.checkOut &&
      formData.guestContact &&
      formData.roomType
    ) {
      const newRoom = { ...formData };
      setRooms([...rooms, newRoom]);
      setFormData({
        roomNumber: "",
        guestName: "",
        checkIn: "",
        checkOut: "",
        guestContact: "",
        roomType: "", // Reset room type to default after adding a room
      });
    }
  };

  const handleDeleteRoom = (index) => {
    const updatedRooms = [...rooms];
    const deletedRoom = updatedRooms.splice(index, 1)[0];

    // TODO: Call a function to remove the deleted room from the scheduling data
    // updateSchedulingData(deletedRoom);

    setRooms(updatedRooms);
  };

  const handleClearAllRooms = () => {
    setRooms([]);
  };

 

  return (
    <div className="App">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4 text-blue">RoomSwift</h1>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="roomNumber"
          >
            Room Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue focus:border-blue-focus"
            id="roomNumber"
            type="text"
            placeholder="Room Number"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="checkIn"
          >
            Check In Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue focus:border-blue-focus"
            id="checkIn"
            type="date"
            placeholder="Check In Date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="checkOut"
          >
            Check Out Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue focus:border-blue-focus"
            id="checkOut"
            type="date"
            placeholder="Check Out Date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="guestName"
          >
            Guest Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue focus:border-blue-focus"
            id="guestName"
            type="text"
            placeholder="Guest Name"
            name="guestName"
            value={formData.guestName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="guestContact"
          >
            Guest Contact
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue focus:border-blue-focus"
            id="guestContact"
            type="phone"
            placeholder="Guest Contact"
            name="guestContact"
            value={formData.guestContact}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="roomType"
          >
            Room Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue focus:border-blue-focus"
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleInputChange}
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>

        <button
          className="bg-blue hover:bg-blue-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          type="button"
          onClick={handleAddRoom}
        >
          Add Room
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          type="button"
          onClick={handleClearAllRooms}
        >
          Clear All
        </button>

        <Link to="/reservationList" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
        Show Info
      </Link>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-blue">
            Allocated Rooms
          </h2>
          <ul>
            {rooms.map((room, index) => (
              <li
                key={index}
                className="text-gray-700 flex justify-between items-center"
              >
                {`Room ${room.roomNumber}: ${room.guestName}`}
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleDeleteRoom(index)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-4 text-blue">Scheduling</h2>
          <SchedulingCalendar rooms={rooms} />
        </div>
      </div>
    </div>
  );
}

export default Allocation;
