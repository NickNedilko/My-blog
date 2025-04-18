
export interface User {
    _id: string;
    userName: string;
    email: string;
    isAdmin: boolean;
    password: string;
    avatarUrl: string;
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