"use client";
import React from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { Priority, Status, Task } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

export const BORDER_COLORS = [
  "border-l-green-200",
  "border-l-yellow-200",
  "border-l-blue-200",
  "border-l-gray-200",
  "border-l-orange-200",
  "border-l-red-200",
];

const getStatus = (status: Status) => {
  switch (status) {
    case Status.COMPLETED:
      return <Badge className="bg-green-200 text-green-800">Completed</Badge>;
    case Status.TO_DO:
      return (
        <Badge className="bg-yellow-200 text-yellow-800">Not Started</Badge>
      );
    case Status.IN_PROGRESS:
      return <Badge className="bg-blue-200 text-blue-800">In Progress</Badge>;
  }
};

const getPriority = (priority: Priority) => {
  switch (priority) {
    case Priority.LOW:
      return <Badge className="bg-gray-200 text-gray-800">Low</Badge>;
    case Priority.MEDIUM:
      return <Badge className="bg-orange-200 text-orange-800">Medium</Badge>;
    case Priority.HIGH:
      return <Badge className="bg-red-200 text-red-800">High</Badge>;
  }
};

interface Props {
  id: string;
  index: number;
  task: Task;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TaskBoardCard = ({
  dragHandleProps,
  draggableProps,
  innerRef,
  task,
}: Props) => {
  return (
    <Card
      className={cn(
        "border-l-4",
        BORDER_COLORS[Math.floor(Math.random() * BORDER_COLORS.length)],
      )}
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {getStatus(task.status)}
          {getPriority(task.priority)}
          {task.dueDate ? (
            <Badge>
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                {new Date(task.dueDate).toLocaleString("en", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskBoardCard;
