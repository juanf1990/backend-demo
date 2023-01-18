const app = require("./app");
const sequelize = require("sequelize");

// Connect to the Postgres DB
const db = new sequelize(
  `postgresql://postgres:ah3e5kTxpQgv6dOJgaZ0@containers-us-west-184.railway.app:7561/railway`,
  {
    dialect: "postgres",
    logging: false,
  }
);

// Test the connection
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error connecting to the Database " + err));

// Use the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Define the routes and endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
