import mongoose from 'mongoose';

// 用于保存连接状态的变量
let isConnected = false;

// 创建一个连接函数
export async function connectToDatabase() {
    if (isConnected) {
        // console.log('Reusing existing database connection');
        return;
    }

    const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/idiom'; // 数据库 URI
    // const DB_URI = 'mongodb://yuehui:Kong%40idiom@43.154.98.79:27071/idiom'; // 数据库 URI

    try {
        await mongoose.connect(DB_URI, {});
        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Database connection failed');
    }
}

export default defineEventHandler(async (event) => {
    await connectToDatabase();
})
