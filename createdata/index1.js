const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());

const dbpath = path.join(__dirname, "userData.db");
let db = null;


const installDBAndServe = async () => {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });

    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        gender TEXT,
        location TEXT;
      );
    `);
 
};


app.post("/usersc", async(request, response) => {
  const {  gender,location} = request.body;


  const userData = 
  `INSERT INTO 
  users 
  (gender,location)
    VALUES
     ('${gender}','${location}');
  `;
    const dbResponse = await db.run(userData);
    const userId = dbResponse.lastID;
    response.send({ userId: userId });

});

app.listen(3020, () => {
  console.log("Server running at http://localhost:3020/usersc");
});


installDBAndServe();
