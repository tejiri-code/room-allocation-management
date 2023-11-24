const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "group_9",
});

connection.connect();

// Show info from DataBase
app.get("/showInfo", (err, res, fields) => {
  const sql = "SELECT * FROM Reservation";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.status(400).json({
        code: 400,
        status: "Failed",
        message: "An Error Occured",
        error: err,
      });
    }
    return res.status(200).json({
      code: 200,
      responseCode: "00",
      status: "success",
      message: "Allocation successful",
      data: data,
    });
  });
});
app.post("/createReservation", async (req, res) => {
  console.log("Request Body:", req.body);
  const {
    roomNumber,
    checkInDate,
    checkOutDate,
    guestName,
    guestContact,
    roomType,
  } = req.body;

  const capacityQuery = "SELECT Capacity FROM Room WHERE Room_Type = ?";
  const [capacityResult] = await connection
    .promise()
    .query(capacityQuery, [roomType]);

  const capacity = capacityResult[0]?.Capacity || 0;
  
  // Insert into the Room table
  const roomSql = "INSERT INTO Room (`Room_Number`, `Room_Type` ,`Capacity`) VALUES (?, ?, ?)";
  const roomValues = [roomNumber, roomType,capacity];

  try {
    
    await connection.promise().query(roomSql, roomValues);
  } catch (roomErr) {
    console.error("Error creating room:", roomErr);
    return res.status(400).json({
      code: 400,
      status: "Failed",
      message: "An Error Occurred while creating room",
      error: roomErr,
    });
  }

  // Insert into the Guest table
  const guestSql =
    "INSERT INTO Guest (`Guest_Name`, `Contact_Number`) VALUES (?, ?)";
  const guestValues = [guestName, guestContact];

  try {
    const [guestResult] = await connection
      .promise()
      .query(guestSql, guestValues);
    const guestId = guestResult.insertId;

    const [roomResult] = await connection
    .promise()
    .query(roomSql, roomValues);

  console.log("Room Result:", roomResult);

  // Retrieve the Room_ID after insertion
  const roomId = roomResult.insertId;

    // Insert into the Reservation table with the retrieved Guest_ID
    const reservationSql =
      "INSERT INTO Reservation (`Room_ID`, `Guest_ID`, `Check_In_Date`, `Check_Out_Date`) VALUES (?, ?, ?, ?)";
    const reservationValues = [roomId, guestId, checkInDate, checkOutDate];

    const [reservationResult] = await connection
      .promise()
      .query(reservationSql, reservationValues);

    return res.status(200).json({
      code: 200,
      responseCode: "00",
      status: "success",
      message: "Room, guest, and reservation created successfully",
      guestData: guestResult,
      reservationData: reservationResult,
    });
  } catch (reservationErr) {
    console.error("Error creating reservation:", reservationErr);
    return res.status(400).json({
      code: 400,
      status: "Failed",
      message: "An Error Occurred while creating reservation",
      error: reservationErr,
    });
  }
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM Reservation WHERE ID = ?";
  const id = req.params.id;
  connection.query(sql, [id], (error, data) => {
    if (error) return res.json("ERROR");
    return res.json("Reservation Cleared");
  });
});

app.post("/login", (req, res) => {
  console.log("Request Body:", req.body);
  const sql = "SELECT * FROM Employee WHERE E_mail = ? AND Password = ? ";

  const values = [req.body.E_mail, req.body.Password];

  connection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(400).json({
        code: 400,
        status: "Failed",
        message: "An Error Occurred",
        error: err,
      });
    }

    console.log("Query Result:", data);

    if (data.length > 0) {
      return res.status(200).json({
        code: 200,
        responseCode: "00",
        status: "success",
        message: "Employee Login successfully",
        data: data,
      });
    } else {
      return res.json("Login Failed");
    }
  });
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
