
export interface User {
    _id: string;
    userName: string;
    email: string;
    isAdmin: boolean;
    password: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
    token: string;    
}


export interface Post {
    _id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    commentsCount: number;
    slug: string;
    viewsCount: number;
    userId: number;
    user: User;
}


export interface PostCommentResponse {
    _id: string;
    content: string;
    post: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
    numberOfLikes: number; 
 }