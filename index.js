import express from "express";
import axios from "axios";

const app=express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
    // Get the city from the query parameters
    const city = req.query.city;
    const apiKey = "49987f54f2db589bbec9665f8e2e9325";
  
    // Add your logic here to fetch weather data from the API
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let weather;
    let error = null;
    try {
      const response = await axios.get(APIUrl);
      weather = response.data;
    } catch (error) {
      weather = null;
      error = "Error, Please try again";
    }
    // Render the index template with the weather data and error message
    res.render("index", { weather, error });
  });
  
  // Start the server and listen on port 3000 or the value of the PORT environment variable
  const port =3000;
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });