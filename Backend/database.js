const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());

app.use(cors());
const connection = mysql.createConnection({
    host : 'localhost',
    user: 'root@localhost',
    password: '',
    database: 'group_9'
})

connection.connect();

// Show info from DataBase
app.get("/showInfo",(err,res, fields) => {
    const sql = "SELECT * FROM Reservation";
    connection.query(sql, (err,data) => {
        if (err) return app.json("ERROR");
        return res.status(200).json({
            status: "success",
            message: ""
        })
    })
})
// Insert Into Database
app.post('/create', (req, res) => {
    const sql = "INSERT INTO Reservation ('Room_Number', 'Guest_Name', 'Check_In_Date', 'Check_Out_Date', 'Contact_Number') VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.Room_Number, 
        req.body.Guest_Name, 
        req.body.Check_In_Date, 
        req.body.Check_Out_Date, 
        req.body.Contact_Number
    ]
    connection.query(sql, values, (error, data) => {
        if (error) return res.json("ERROR");
        return res.json("Reservation Created");
    })
})
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM Reservation WHERE ID = ?";
    const id = req.params.id;
    connection.query(sql, [id], (error, data) => {
        if (error) return res.json("ERROR");
        return res.json("Reservation Cleared");
    })
})

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});