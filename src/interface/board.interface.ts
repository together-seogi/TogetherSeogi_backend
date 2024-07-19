interface Board {
    writerId: Number;
    articleId: Number;
    category: String;
    mainImage: {
        fileName: String;
        filePath: String;
    }
    title: String;
    content: String;
    likes?: Boolean; hates?: Boolean;
    createdAt: Date;
}

export default Board;