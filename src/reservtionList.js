// ReservationList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReservationList = () => {
    const navigate = useNavigate();

    const handleBack = () => {
      // Navigate back to the Allocation page
      navigate("/allocation");
    };

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:8082/showInfo");
        setReservations(response.data.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 text-blue underline text-center">
        Reservation List
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
        onClick={handleBack}
      >
        Back
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.ID} className="mb-4 p-4 mt-2 border rounded">
              <strong>Reservation ID:</strong> {reservation.Reservation_Number}
              <br />
              <strong>Room ID:</strong> {reservation.Room_ID}
              <br />
              <strong>Guest ID:</strong> {reservation.Guest_ID}
              <br />
              <strong>Check-In Date:</strong> {reservation.Check_In_Date}
              <br />
              <strong>Check-Out Date:</strong> {reservation.Check_Out_Date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationList;
