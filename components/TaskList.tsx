"use client";
import React, { useState } from "react";
import FilterAndSort from "./FilterAndSort";
import TaskCard from "./TaskCard";
import { Loader } from "lucide-react";
import { Task } from "@/types";
import { useQuery } from "react-query";
import axios from "axios";
import useUserStore from "@/store/useUserStore";

const TaskList = () => {
  const user = useUserStore((state) => state.user);
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", user],
    queryFn: async () => {
      const response = await axios.get("/api/task");
      return response.data;
    },
  });
  const [sortedData, setSortedData] = useState<Task[]>(data || []);
  if (error) {
    console.log(error);
    return null;
  }

  return (
    <>
      {isLoading ? <Loader className="w-4 h-4 mx-auto animate-spin" /> : null}
      {data ? (
        <>
          <FilterAndSort
            originalData={data as Task[]}
            setSortedData={setSortedData}
          />
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
