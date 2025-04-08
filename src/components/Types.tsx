export type Id = string | number;
export type Column ={
    id: string;
    title: string;
};
export type Task = {
    id: Id;
    columnId: Id;
    content: string;
};