
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
    _id: number;
    title: string;
    content: string;
    category: string;
    tags: string[];
    imageUrl?: string;
    createdAt: Date;
    slug: string;
    viewsCount: number;
    userId: number;
    user: User;
}