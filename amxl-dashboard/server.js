const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.run(`
CREATE TABLE IF NOT EXISTS performance (
id INTEGER PRIMARY KEY AUTOINCREMENT,
week TEXT,
name TEXT,
dept TEXT,
units INTEGER,
errors INTEGER
)
`);

app.get("/data", (req,res)=>{

db.all("SELECT * FROM performance", (err,rows)=>{

res.json(rows);

});

});

app.post("/add",(req,res)=>{

const {week,name,dept,units,errors}=req.body;

db.run(

"INSERT INTO performance (week,name,dept,units,errors) VALUES (?,?,?,?,?)",

[week,name,dept,units,errors]

);

res.send("Added");

});

app.delete("/delete/:id",(req,res)=>{

db.run("DELETE FROM performance WHERE id=?",[req.params.id]);

res.send("Deleted");

});

app.listen(3000,()=>{

console.log("Running");

});
