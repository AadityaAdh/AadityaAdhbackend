const app = require("./app.js");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");
const cors = require("cors");
const PORT=process.env.PORT || 4001;
const cookieParser=require("cookie-parser")



// Load environment variables
dotenv.config({ path: "./.env" });

// Connect to the database
connectDatabase();

// Enable CORS


// app.use(cors({credentials:true,origin:"https://aadityaadhikari.com.np"}));

app.use(cors({credentials:true,origin:true}));



app.use(cookieParser());

// Import product routes
const postRoutes = require("./routes/postRoute.js");

// Use the routes
app.use( postRoutes);

const blogRoutes=require("./routes/blogRoute.js")
app.use(blogRoutes)

const userRoutes=require("./routes/userRoute.js")
app.use(userRoutes)




// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});