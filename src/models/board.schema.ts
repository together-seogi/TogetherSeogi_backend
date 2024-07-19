import mongo from 'mongoose';

const boardSchema = new mongo.Schema({
    writerId: { type: Number, required: true },
    articleId: { type: Number, required: true },
    category: { type: String, required: true }, // 생활 팁, 같이 먹어요, 이거 좋아요
    mainImage: {
        fileName: { type: String, required: true },
        filePath: { type: String, required: true }
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Boolean, default: 0 }, hates: { type: Boolean, default: 0 },
    views: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now() }
});

export default mongo.model('board', boardSchema);