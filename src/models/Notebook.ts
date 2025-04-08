export interface Notebook {
    id: number;
    title: string;
    description?: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}