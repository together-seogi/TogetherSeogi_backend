interface Board {
    writerId: Number;
    articleId: Number;
    category: String;
    imgUrl?: String;
    title: String;
    content: String;
    likes?: Boolean; hates?: Boolean;
    views: Number;
    createdAt: Date;
}

export default Board;