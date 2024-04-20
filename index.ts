import mongoose from "mongoose";
import app from "./src/app";

const PORT = process.env.PORT || 3000;

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})

mongoose.connection.on("error", (error) => {
    console.error(error);
});