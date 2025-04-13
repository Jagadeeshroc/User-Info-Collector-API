app.put("/users/:userId/",async(request,response)=>{
  const {userId}= request.params;
  const userDetails= request.body;
  const { username,name,password}=userDetails;
      const updateUserQuery= 
      ` UPDATE 
           users
           SET
           username= '${username}',
           name= '${name}',     
           password= '${password}'
           WHERE
             id= ${userId}  ;`;
        const dbResponse= await db.run(updateUserQuery);
        response.send( dbResponse );
      
  })
  
app.delete("/users/:userId",async(request,response)=>{
  const {user}= request.params;
  const deleteUserQuery=
  `DELETE  
  FROM
  users
  WHERE
  id= ${userId}  ;`;
  const dbResponse = await db.run(deleteUserQuery);
  response.send(dbResponse);
})

app.get("/users/:username/",async(request,response)=>{
  const {username}= request.params;
  const userDetailQuery =
 `SELECT  *
   FROM 
   users
    WHERE 
    username= ${username}  ;`;

    const dbResponse = await db.get(userDetailQuery);
    response.send(dbResponse);
})

app.listen(3020, () => {
console.log("Server running at http://localhost:3020/usersc");
});

