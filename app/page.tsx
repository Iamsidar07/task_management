"use client";
import TaskList from "@/components/TaskList";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  if (!user) {
    router.push("/signin");
  }
  return (
    <div className="w-full max-w-7xl mx-auto pt-8">
      <TaskList />
    </div>
  );
}
