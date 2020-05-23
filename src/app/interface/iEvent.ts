import { firestore } from "firebase/app";

export interface IEvent {
    id?: string;
    name: string;
    date: firestore.Timestamp;
    details: string;
    imageUrl: string;
    file: string;
}