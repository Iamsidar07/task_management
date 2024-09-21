"use client";
import React, { useEffect, useState } from "react";
import FilterAndSort from "./FilterAndSort";
import TaskCard from "./TaskCard";
import { Loader } from "lucide-react";
import { Task } from "@/types";
import useTaskStore from "@/store/useTaskStore";

const TaskList = () => {
  const data = useTaskStore((state) => state.tasks);
  const isLoading = useTaskStore((state) => state.isLoading);
  const getTasks = useTaskStore((state) => state.getTasks);
  const [sortedData, setSortedData] = useState<Task[]>(data || []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

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
