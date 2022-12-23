import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
const db = mysql.createConnection({
    host: "localhost",
    port:"3306",
    user: "root",
    password: "monday12",
    database: "test"
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("this is backend.")
});
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err)
            return res.json(err);
        else
            return res.json(data);
    });
 });

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`,`price`) VALUES(?)";
    const values = [req.body.title, req.body.desc, req.body.cover, req.body.price];
    db.query(q, [values], (err, data) => {
        if (err)
            return res.json(err);
        else
            return res.json("Have a books.");
    });
});
    
app.listen(8800, () => {
    console.log("connet to backend .");
});