export interface Comment {
    username: string;
    content: string;
}

export interface Post {
    username: string;
    content: string;
    image?: string;
    likes: string[]; // lista de usernames que dieron like
    comments: Comment[];
    date: Date | string;
    show: boolean;
}
