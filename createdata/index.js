const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());

const dbpath = path.join(__dirname, "userData.db");
let db = null;

const installdbAndServe = async () => {
  try {
    // Open the database connection
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });


    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `);

  } catch (e) {
    console.log("Error:", e.message);
  }

  app.listen(3020, () => {
    console.log("Server running at http://localhost:3020/users/");
  });
};


// app.post("/users", async (request, response) => {//
  const { username, name, password } = request.body;

  // Prepare the SQL query to insert user data
  const userData = `
    INSERT INTO users (username, name, password)
    VALUES ('${username}', '${name}', '${password}')
  `;

  try {
 
    const dbResponse = await db.run(userData);


    const userId = dbResponse.lastID;

    // Send the user ID as a response
    response.send({ userId: userId });
  } catch (error) {
    console.log("Error inserting user:", error.message);
    response.status(500).send({ error: "Failed to insert user" });
  }
});




app.get("/users",async(request,response)=>{

const userDetails=await db.all("SELECT * FROM Users");
response.send(userDetails);
});

app.listen(3010,()=>{
  console.log("Server running at http://localhost:3010/users");
});
installdbAndServe();