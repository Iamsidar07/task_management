"use client";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Loader, TrashIcon } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteTask = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const handleDeleteTask = useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      axios.delete(`/api/task?id=${id}`),
    onSuccess: async () => {
      console.log("trying to revalidate query tasks");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete");
    },
  });
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={handleDeleteTask.isLoading} variant={"destructive"}>
            <TrashIcon className="w-3 h-3 mr-1.5" />
            <span className="hidden sm:inline-flex">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              task with id{" "}
              <span className="font-mono bg-secondary px-2 py-1 rounded-md">
                {id}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={handleDeleteTask.isLoading}
              onClick={() => handleDeleteTask.mutate({ id })}
              className={buttonVariants({
                variant: "destructive",
              })}
            >
              {handleDeleteTask.isLoading ? (
                <Loader className="animate-spin w-4 h-4 mr-1.5" />
              ) : null}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteTask;
