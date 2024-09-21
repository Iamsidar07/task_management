"use client";

import { Task } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const useEditTask = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const editTaskMutation = useMutation({
    mutationFn: async (task: Task) => axios.patch(`/api/task?id=${id}`, task),
    onSuccess: async () => {
      console.log("trying to revalidate");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  return { editTaskMutation, isOpen, setIsOpen };
};

export default useEditTask;
