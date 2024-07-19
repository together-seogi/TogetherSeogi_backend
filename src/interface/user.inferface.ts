interface User {
    userId?: Number;
    userNick?: String;
    abutMe: String;
    level?: Number;
    providerData: {
        email: String;
        name: String;
        uid: String;
    }
    profilePhoto?: String
}

export default User;