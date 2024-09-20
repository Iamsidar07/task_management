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
import { FormEvent, ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Loader, PencilIcon } from "lucide-react";
import { toast } from "sonner";
import { Task, Priority, Status } from "@/types";

interface TaskFormProps {
  trigger?: ReactNode;
  task?: Task;
  onSubmit: (task: Task) => Promise<void>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mode: "create" | "edit";
  isLoading: boolean;
}

function TaskForm({
  trigger,
  task,
  onSubmit,
  isOpen,
  setIsOpen,
  mode,
  isLoading,
}: TaskFormProps) {
  const [formTask, setFormTask] = useState<Task>({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || Status.TO_DO,
    priority: task?.priority || Priority.MEDIUM,
    dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formTask.title) {
      toast.error("Task title is required");
      return;
    }
    try {
      await onSubmit(formTask);
      toast.success(
        `${mode === "create" ? "Task created" : "Task updated"} successfully`
      );
      setFormTask({
        title: "",
        description: "",
        status: Status.TO_DO,
        priority: Priority.LOW,
        dueDate: undefined,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to save task", error);
      toast.error(`Failed to ${mode === "create" ? "create" : "update"} task`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : mode === "create" ? (
          <Button variant="outline">
            <PencilIcon className="w-3 h-3 mr-1.5" />
            <span className="hidden sm:inline-block">Add new task</span>
          </Button>
        ) : (
          <Button variant="outline">
            <PencilIcon className="w-3 h-3 mr-1.5" />
            <span className="hidden sm:inline-flex">Edit</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Add new task" : "Edit task"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                value={formTask.title}
                onChange={(e) =>
                  setFormTask((prev) => ({ ...prev, title: e.target.value }))
                }
                id="title"
                required
                placeholder="Something to add..."
              />
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                value={formTask.description}
                onChange={(e) =>
                  setFormTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                id="description"
                placeholder="Here goes the description of the task."
              />
            </div>
            <p className="text-left -mb-1 text-sm font-medium">Status</p>
            <Select
              value={formTask.status}
              onValueChange={(value: Status) => {
                setFormTask((prev) => ({ ...prev, status: value }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
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
              value={formTask.priority}
              onValueChange={(value: Priority) => {
                setFormTask((prev) => ({ ...prev, priority: value }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
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
                    {formTask.dueDate
                      ? formTask.dueDate.toLocaleString("en-US", {
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
                  selected={formTask.dueDate}
                  onSelect={(date) => {
                    setFormTask((prev) => ({ ...prev, dueDate: date }));
                  }}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className="animate-spin w-4 h-4 mr-1.5" />
              ) : null}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskForm;
