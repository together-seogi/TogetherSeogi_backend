interface User {
    userId?: Number;
    userNick?: String;
    aboutMe: String;
    level?: Number;
    providerData: {
        email: String;
        name: String;
        uid: String;
    }
    profilePhoto?: String
}

export default User;