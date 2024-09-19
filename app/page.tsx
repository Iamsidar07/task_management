"use client";
import { Task } from "@/components/CreateTask";
import TaskCard from "@/components/TaskCard";
import axios from "axios";
import { Loader } from "lucide-react";
import { useQuery } from "react-query";
import { toast } from "sonner";

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("/api/task");
      return response.data;
    },
  });
  console.log(data);
  if (error) {
    toast.error("Failed to retrieve tasks");
    return null;
  }
  return (
    <div>
      {isLoading ? (
        <Loader className="animate-spin w-5 h-5 mx-auto" />
      ) : data ? (
        data.map((task: Task) => <TaskCard key={task._id} {...task} />)
      ) : null}
    </div>
  );
}
