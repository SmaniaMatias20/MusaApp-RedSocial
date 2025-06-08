export interface Comment {
    username: string;
    content: string;
}

export interface Post {
    firstName: string;
    lastName: string;
    profileImage: string;
    username: string;
    content: string;
    image?: string;
    likes: string[];
    comments: Comment[];
    date: string;
    show: boolean;
}
