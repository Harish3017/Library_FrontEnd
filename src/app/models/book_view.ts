import { Author } from "./author";

export interface Book_View{
    _id:string;
    title:string;
    isbn:string;
    author: Author;
}