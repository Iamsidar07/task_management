import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Priority, Status, Task, TypedColumn } from "@/types";
import { cn } from "@/lib/utils";
import TaskBoardCard from "./TaskBoardCard";
import { PlusIcon } from "lucide-react";
import CreateTask from "./CreateTask";
import { buttonVariants } from "./ui/button";
import { CustomDroppable } from "./CustomDroppable";

interface ColumnProps {
  tasks: Task[];
  index: number;
  id: TypedColumn;
}

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  IN_PROGRESS: "⌛ In Progress",
  COMPLETED: "✔️ Done",
  TO_DO: "📋 To do",
};

const Column = ({ tasks, id, index }: ColumnProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CustomDroppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn("p-2 md:p-4 rounded-2xl bg-opacity-50", {
                  "bg-secondary/30 border-dashed border": snapshot.isDraggingOver,
                })}
              >
                <h2 className="text-lg md:text-2xl font-semibold flex items-center justify-between">
                  {idToColumnText[id]}{" "}
                  <span
                    className={buttonVariants({
                      size: "sm",
                      className: "rounded-full text-sm font-normal",
                      variant: "secondary",
                    })}
                  >
                    {tasks.length}
                  </span>
                </h2>
                <div className="space-y-2 mt-4">
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id!}
                      index={index}
                    >
                      {(provided) => (
                        <TaskBoardCard
                          id={id}
                          index={index}
                          task={task as Task}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <CreateTask
                    trigger={
                      <div className="flex items-end justify-end p-2">
                        <div className="bg-green-500 hover:bg-green-600 rounded-full p-2 cursor-pointer">
                          <PlusIcon className="w-5 h-5" />
                        </div>
                      </div>
                    }
                    task={{
                      status: Status[id],
                      title: "",
                      priority: Priority.LOW,
                    }}
                  />
                </div>
              </div>
            )}
          </CustomDroppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
