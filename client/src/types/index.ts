
export interface User {
    id: number;
    userName: string;
    email: string;
    isAdmin: boolean;
    password: string;
    avatarUrl: string;
    token: string;    
}


export interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    tags: string[];
    imageUrl?: string;
    slug: string;
    viewsCount: number;
    userId: number;
    user: User;
}