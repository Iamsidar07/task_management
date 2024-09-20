"use client";
import TaskList from "@/components/TaskList";
import axios from "axios";
import { Loader } from "lucide-react";
import { useQuery } from "react-query";
import { toast } from "sonner";

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      console.log("revalidating...");
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
    <div className="w-full max-w-7xl mx-auto">
      {isLoading ? <Loader className="w-4 h-4 mx-auto animate-spin" /> : null}
      {data ? <TaskList data={data} /> : null}
    </div>
  );
}
