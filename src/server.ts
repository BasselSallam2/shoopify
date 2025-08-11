
import app from '@/app.js';
import dotenv from 'dotenv';
import  connectDB  from '@config/db.js';
import ConnectRedus from '@cash/cashClient.js';



dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB(process.env.MONGO_URI!);
  await ConnectRedus.connect();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

