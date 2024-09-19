"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "./ui/calendar";
import { FormEvent, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Loader } from "lucide-react";
import { toast } from "sonner";
import { QueryClient, useMutation } from "react-query";
import axios from "axios";

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

export interface Task {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: Date | undefined;
}

function CreateTask() {
  const [isOpen, setIsOpen] = useState(false);
  const client = new QueryClient();
  const handleCreateTask = useMutation({
    mutationFn: async ({ task }: { task: Task }) =>
      axios.post("/api/task", task),
    onSuccess: () => {
      client.invalidateQueries(["tasks"]);
    },
  });
  const [task, setTask] = useState<Task>({
    title: "",
    priority: Priority.MEDIUM,
    status: Status.TO_DO,
    dueDate: undefined,
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.title) {
      toast.error("Task title is required");
      return;
    }
    try {
      await handleCreateTask.mutateAsync({ task });
      toast.success("Task created successfully");
      setIsOpen(false);
    } catch (error) {
      console.log("down");
      console.log("Failed to create task", error);
      toast.error("Failed to create task");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add new task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                onChange={(e) =>
                  setTask((prev) => ({ ...prev, title: e.target.value }))
                }
                id="title"
                required
                placeholder="Something to add..."
              />
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                onChange={(e) =>
                  setTask((prev) => ({ ...prev, description: e.target.value }))
                }
                id="description"
                placeholder="Here goes the description of the task."
              />
            </div>
            <p className="text-left -mb-1 text-sm font-medium">Status</p>
            <Select
              onValueChange={(value: Status) => {
                setTask((prev) => ({ ...prev, status: value }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent defaultValue={Status.TO_DO}>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value={Status.TO_DO}>Todo</SelectItem>
                  <SelectItem value={Status.IN_PROGRESS}>
                    In Progress
                  </SelectItem>
                  <SelectItem value={Status.COMPLETED}>Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-left -mb-1 text-sm font-medium">Priority</p>
            <Select
              onValueChange={(value: Priority) => {
                setTask((prev) => ({ ...prev, priority: value }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent defaultValue={Priority.LOW}>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value={Priority.LOW}>Low</SelectItem>
                  <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={Priority.HIGH}>High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-left -mb-1 text-sm font-medium">Due Date</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="pl-3" variant={"outline"}>
                  <span>
                    {task.dueDate
                      ? task.dueDate.toLocaleString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Pick a date"}
                  </span>
                  <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={task.dueDate}
                  onSelect={(date) => {
                    console.log(date, typeof date);
                    setTask((prev) => ({ ...prev, dueDate: date }));
                  }}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={handleCreateTask.isLoading}>
              {handleCreateTask.isLoading ? (
                <Loader className="w-4 h-4 animate-spin mr-1.5" />
              ) : null}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
