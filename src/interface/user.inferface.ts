interface User {
    userId: Number;
    userNick: String;
    level: Number;
    providerData: {
        email: String;
        name: String;
        uid: String;
    }
    profilePhoto?: String
}