export interface Board {
  columns: Map<TypedColumn, Column>;
}

export type TypedColumn = "TO_DO" | "IN_PROGRESS" | "COMPLETED";

export enum Status {
  "TO_DO" = "TO_DO",
  "IN_PROGRESS" = "IN_PROGRESS",
  "COMPLETED" = "COMPLETED",
}

export enum Priority {
  "LOW" = "LOW",
  "MEDIUM" = "MEDIUM",
  "HIGH" = "HIGH",
}

export interface Column {
  id: TypedColumn;
  tasks: Task[];
}

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: Date | undefined;
}

export interface User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
}
