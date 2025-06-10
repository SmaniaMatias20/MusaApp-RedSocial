export class CreateCommentDto {
    idUser: string;
    username: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    content: string;
    date?: Date | string;
    edited: boolean;
    show: boolean;
}
