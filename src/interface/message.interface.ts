interface Msg {
    senderId: Number;
    receiverId: Number;
    createdAt?: Date;
    content: String;
    isRead?: Boolean
};

export default Msg;