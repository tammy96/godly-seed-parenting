export interface IComment {
    id?: string;
    message: string;
    authorName: string;
    authorImageUrl: string;
    timeStamp: number;
    replies: [{
        message: string;
        authorName: string;
        authorImageUrl: string;
        timeStamp: number;
    }]
}