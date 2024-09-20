import React, { useState } from "react";
import { Task } from "./TaskForm";
import FilterAndSort from "./FilterAndSort";
import TaskCard from "./TaskCard";

const TaskList = ({ data }: { data: Task[] }) => {
  const [sortedData, setSortedData] = useState<Task[]>(data);
  return (
    <>
      <FilterAndSort originalData={data} setSortedData={setSortedData} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 w-full">
        {sortedData.map((task: Task) => (
          <TaskCard key={task._id} {...task} />
        ))}
      </div>
    </>
  );
};

export default TaskList;
