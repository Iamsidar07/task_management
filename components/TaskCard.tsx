"use client";
import React from "react";
import { Status, Task } from "./CreateTask";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button, buttonVariants } from "./ui/button";

const TaskCard = (props: Task) => {
  let status = (
    <div
      className={buttonVariants({
        className: "flex items-center gap-1",
      })}
    ></div>
  );
  switch (props.status) {
    case Status.COMPLETED:
      status = (
        <div
          className={buttonVariants({
            className: "flex items-center gap-1",
          })}
        >
          Completed
        </div>
      );
      break;
    case Status.TO_DO:
      status = (
        <div
          className={buttonVariants({
            className: "flex items-center gap-1",
          })}
        >
          To do
        </div>
      );
      break;
    case Status.IN_PROGRESS:
      status = (
        <div
          className={buttonVariants({
            className: "flex items-center gap-1",
          })}
        >
          In progress
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span>{status}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
