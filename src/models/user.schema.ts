import mongo from 'mongoose';

const authSchema = new mongo.Schema({
    userId: { type: Number, required: true }, // url param에 사용 (content 시청 시)
    userNick: { type: String, required: true },
    level: { type: Number, required: true },
    providerData: {
        email: { type: String, required: true },
        name: { type: String, required: true },
        uid: { type: String, required: true }
    },
    profilePhoto: { type: String, default: "none"}, // none인 경우 FE단에서 기본 프로필 로드
})

export default mongo.model('user_data', authSchema);

/**
 * User Info 같은 경우 Minimum Info로 하되, 유저 레벨(당근 온도) 시스템 도입하기
 */