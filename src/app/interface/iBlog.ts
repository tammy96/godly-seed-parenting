export interface IBlog {
    id?: string;
    title: string;
    body: string;
    imageUrl: string;
    file: string;
    createdAt: number;
    comments?: [{
        authorName: string;
        authorImageUrl: string;
        timeStamp: number;
        message: string;
        reply?: [{
            authorName: string;
            authorImageUrl: string;
            timeStamp: number;
            message: string;
        }]
    }]

}