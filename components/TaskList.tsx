"use client";
import React, { useState } from "react";
import FilterAndSort from "./FilterAndSort";
import TaskCard from "./TaskCard";
import { Loader } from "lucide-react";
import { useTaskContext } from "./TaskContext";
import { Task } from "@/types";

const TaskList = () => {
  const { data, isLoading } = useTaskContext();
  const [sortedData, setSortedData] = useState<Task[]>(data || []);
  return (
    <>
      {isLoading ? <Loader className="w-4 h-4 mx-auto animate-spin" /> : null}
      {data ? (
        <>
          <FilterAndSort setSortedData={setSortedData} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 w-full">
            {sortedData.map((task: Task) => (
              <TaskCard key={task._id} {...task} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default TaskList;
