const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Ashish:Ashish1998@cluster0.dvq2z.mongodb.net/PharmacyApp?retryWrites=true&w=majority', (err) => {
    if (!err) 
        console.log("MongoDB connection succeeded.");
    else 
        console.log("Error in MongoDB connection: " + JSON.stringify(err,undefined,2));
});

require("./user.model");
