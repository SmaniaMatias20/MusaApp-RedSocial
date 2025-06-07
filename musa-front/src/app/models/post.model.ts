export interface Comment {
    username: string;
    content: string;
}

export interface Post {
    username: string;
    content: string;
    image?: string;
    likes: string[];
    comments: Comment[];
    date: string;
    show: boolean;
}
