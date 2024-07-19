import mongo from "mongoose";

const commentSchema = new mongo.Schema({
    writerId: { type: Number, required: true },
    articleId: { type: Number, required: true },
    content: { type: String, required: true },
});

export default mongo.model('comments', commentSchema);