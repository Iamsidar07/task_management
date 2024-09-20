"use client";
import React, { ChangeEvent, useEffect } from "react";
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
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ListFilterIcon,
} from "lucide-react";
import { Priority, Status, Task } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { debounce } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useTaskContext } from "./TaskContext";

interface Props {
  setSortedData: React.Dispatch<React.SetStateAction<Task[]>>;
}
const FilterAndSort = ({ setSortedData }: Props) => {
  const { data: originalData } = useTaskContext();
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dueDate: undefined as Date | undefined,
  });
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = originalData.filter((task) => {
      const statusMatch = !filters.status || task.status === filters.status;
      const priorityMatch =
        !filters.priority || task.priority === filters.priority;
      const dueDateMatch =
        !filters.dueDate ||
        (task?.dueDate && new Date(task.dueDate) <= filters.dueDate);
      return statusMatch && priorityMatch && dueDateMatch;
    });
    filteredData.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate) : new Date(0);
      const dateB = b.dueDate ? new Date(b.dueDate) : new Date(0);
      return sortDirection === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    setSortedData(filteredData);
  }, [filters, originalData, setSortedData, sortDirection]);

  const handleReset = () => {
    setFilters({
      status: "",
      priority: "",
      dueDate: undefined,
    });
    setSortDirection("desc");
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const searchTask = (query: string) => {
    console.log("Searching for", query);
    if (query.trim().length === 0) return;
    const result = originalData.filter(
      (task) =>
        task.title.toLowerCase().trim().includes(query.toLowerCase().trim()) ||
        task?.description
          ?.toLowerCase()
          .trim()
          .includes(query.toLowerCase().trim())
    );
    setSortedData(result);
  };

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const debounceFunction = debounce(() => searchTask(e.target.value), 500);
    debounceFunction();
  };

  return (
    <div>
      <div className="flex items-center gap-2 md:gap-6">
        <Input
          placeholder="search by title, description..."
          className="mt-auto flex-1 sm:max-w-sm"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size={"icon"}>
              <ListFilterIcon className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter and sort</DialogTitle>
              <DialogDescription></DialogDescription>
              <p className="text-left mb-1 text-sm font-medium">Status</p>
              <Select
                value={filters.status}
                onValueChange={(value: Status | "") => {
                  setFilters((prev) => ({ ...prev, status: value }));
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
              <p className="text-left mb-1 text-sm font-medium">Priority</p>
              <Select
                value={filters.priority}
                onValueChange={(value: Priority) => {
                  setFilters((prev) => ({ ...prev, status: value }));
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
              <p className="text-left mb-1 text-sm font-medium">Due Date</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="pl-3 text-left" variant={"outline"}>
                    <span>
                      {filters.dueDate
                        ? filters.dueDate.toLocaleString("en-US", {
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
                    selected={filters.dueDate}
                    onSelect={(date) => {
                      setFilters((prev) => ({ ...prev, dueDate: date }));
                    }}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={handleReset}
                variant="outline"
                className="mt-auto"
              >
                Reset Filters
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-1 mt-auto"
                onClick={toggleSortDirection}
              >
                Sort by Due date
                {sortDirection === "asc" ? (
                  <ChevronUpIcon className="w-4 h-4 opacity-50" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 opacity-50" />
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FilterAndSort;
