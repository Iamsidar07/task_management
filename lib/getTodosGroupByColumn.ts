import { Column, Task, TypedColumn } from "@/types";

export const getTodosGroupByColumn = async () => {
  const response = await fetch("/api/task");
  const data = (await response.json()) as Task[];
  console.log("from lib", data);
  const columns = data.reduce((acc, todo: Task) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        tasks: [],
      });
    }
    acc.get(todo.status)?.tasks.push(todo);
    return acc;
  }, new Map<TypedColumn, Column>());
  console.log("columns", columns);
  const columnTypes: TypedColumn[] = ["TO_DO", "IN_PROGRESS", "COMPLETED"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        tasks: [],
      });
    }
  }
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]),
    ),
  );
  const board = {
    columns: sortedColumns,
  };
  return board;
};
