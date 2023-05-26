const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  res.send(JSON.stringify(friends,null,4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  res.send(friends[email]);
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  if (req.body.email) {
    friends[req.body.email] = {
      'firstName':req.body.firstName,
      'lastName':req.body.lastName,
      'DOB':req.body.DOB
    }
  }
  res.send("The user" + " " + (req.body.firstName) + " has been added!");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_friend = friends[email]
  if(filtered_friend) {
    let DOB = req.body.DOB
    let firstName = req.body.firstName
    let lastName = req.body.lastName

    if(DOB) {
      filtered_friend[DOB] = DOB
    }
    if(firstName) {
      filtered_friend[firstName] = firstName
    }
    if(lastName) {
      filtered_friend[lastName] = lastName
    }
    friends[email] = filtered_friend;
    res.send(`Friend with the email  ${email} updated.`);
  } else {
    res.send("Unable to find friends!");
  }

});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  if(email){
    delete friends[email]
  }
  res.send(`Friend with the email  ${email} deleted.`);
});

module.exports=router;
