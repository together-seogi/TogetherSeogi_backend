import mongo from "mongoose";

const msgSchema = new mongo.Schema({
    senderId: { type: Number, required: true },
    receiverId: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() },
    content: { type: String, required: true },
    isRead: { type: Boolean, required: true }
});

export default mongo.model('msg', msgSchema);