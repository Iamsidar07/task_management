"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import TaskForm, { Task } from "./TaskForm";
import axios from "axios";

const EditTask = ({ existingTask }: { existingTask: Task }) => {
  const queryClient = useQueryClient();

  const editTaskMutation = useMutation({
    mutationFn: async (task: Task) =>
      axios.patch(`/api/task?id=${existingTask._id}`, task),
    onSuccess: async () => {
      console.log("trying to revalidate");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleEditTask = async (task: Task) => {
    await editTaskMutation.mutateAsync(task);
  };
  return (
    <div>
      <TaskForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        task={existingTask}
        onSubmit={handleEditTask}
        mode="edit"
        isLoading={editTaskMutation.isLoading}
      />
    </div>
  );
};

export default EditTask;
