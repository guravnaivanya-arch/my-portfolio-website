const express = require("express");
const mongoose = require("mongoose"); // Import our database helper
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// 1. CONNECT TO THE DATABASE
// Replace the text inside the quotes below with YOUR actual MongoDB connection string!
const myDatabaseURL =
  "mongodb+srv://myuser:M8HW05VJolSmy0As@cluster0.q064vkm.mongodb.net/portfolio?appName=Cluster0";
mongoose
  .connect(myDatabaseURL)
  .then(() => console.log("🔌 Connected to the MongoDB Database successfully!"))
  .catch((err) => console.log("❌ Database connection error:", err));

// 2. CREATE A BLUEPRINT FOR THE MESSAGES
// This tells the database exactly what a message should look like (a name and a message text)
const ContactSchema = new mongoose.Schema({
  name: String,
  message: String,
});

// Create a collection (like a spreadsheet tab) named "Messages"
const ContactModel = mongoose.model("Message", ContactSchema);

// 3. HANDLE THE FORM SUBMISSION
app.post("/submit-form", async (req, res) => {
  try {
    // Grab data from the frontend form
    const newContactData = new ContactModel({
      name: req.body.name,
      message: req.body.message,
    });

    // Save it permanently into the database!
    await newContactData.save();

    console.log(
      `💾 Saved message from ${req.body.name} directly to the database!`,
    );

    // Show a nice success page to the user
    res.send(
      "<h1>Success! Your message has been saved in the cloud database!</h1>",
    );
  } catch (error) {
    res.status(500).send("Uh oh, something went wrong saving your message.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is awake on http://localhost:${PORT}`);
});
