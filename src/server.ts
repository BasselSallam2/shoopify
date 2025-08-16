import app from "@/app.js";
import "dotenv/config";
import connectDB from "@config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB(process.env.MONGO_URI!);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
