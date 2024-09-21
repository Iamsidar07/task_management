"use client";

import TaskForm from "./TaskForm";
import { Task } from "@/types";
import useEditTask from "@/hooks/useEditTask";

const EditTask = ({ existingTask }: { existingTask: Task }) => {
  const { editTaskMutation, isOpen, setIsOpen } = useEditTask({
    id: existingTask._id as string,
  });
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
