import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Priority, Status, Task } from "@/types";

export const getBoarderColor = (status: Status) => {
  switch (status) {
    case Status.COMPLETED:
      return "border-l-green-200";
    case Status.TO_DO:
      return "border-l-yellow-200";
    case Status.IN_PROGRESS:
      return "border-l-blue-200";
  }
};

export const getStatus = (status: Status) => {
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

export const getPriority = (priority: Priority) => {
  switch (priority) {
    case Priority.LOW:
      return <Badge className="bg-gray-200 text-gray-800">Low</Badge>;
    case Priority.MEDIUM:
      return <Badge className="bg-orange-200 text-orange-800">Medium</Badge>;
    case Priority.HIGH:
      return <Badge className="bg-red-200 text-red-800">High</Badge>;
  }
};

const TaskCard = (props: Task) => {
  return (
    <Card className={cn("border-l-4", getBoarderColor(props.status))}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {getStatus(props.status)}
          {getPriority(props.priority)}
          {props.dueDate ? (
            <Badge>
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                {new Date(props.dueDate).toLocaleString("en", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </Badge>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <EditTask existingTask={props} />
        <DeleteTask id={props._id as string} />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
