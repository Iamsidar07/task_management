import { Loader } from "lucide-react";
import { Metadata } from "next";
import React, { Suspense } from "react";

const KanbanBoard = React.lazy(() => import("@/components/KanbanBoard"));

export const metadata: Metadata = {
  title: "Taskii-Your Task Board",
};

export default function Board() {
  return (
    <div className="pt-8">
      <Suspense
        fallback={<Loader className="mt-4 mx-auto w-5 h-5 animate-spin" />}
      >
        <KanbanBoard />
      </Suspense>
    </div>
  );
}
