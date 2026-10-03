require("dotenv").config();
const app = require("./app");

const connectDB = require("./config/database");
connectDB();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});