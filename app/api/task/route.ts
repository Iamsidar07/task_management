import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/connectToDB";
import Task from "@/models/task";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { taskCreateSchema, taskUpdateSchema } from "@/schemas/task";

connectToDB();

export async function GET(req: NextRequest) {
  try {
    const data = getDataFromToken(req);
    const tasks = await Task.find({ userId: data.id });
    console.log(data);
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const data = getDataFromToken(req);
    console.log({ id, userId: data.id });
    const task = await Task.findOneAndDelete({
      userId: data.id,
      _id: id,
    });
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Delete successfully", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const data = taskUpdateSchema.parse(
      reqBody?.dueDate
        ? { ...reqBody, dueDate: new Date(reqBody.dueDate) }
        : reqBody,
    );
    const { id: userId } = getDataFromToken(req);
    const task = await Task.findOneAndUpdate(
      {
        userId,
        _id: data.id,
      },
      data,
    );
    console.log(task);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Delete successfully", task, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const data = taskCreateSchema.parse(
      reqBody?.dueDate
        ? { ...reqBody, dueDate: new Date(reqBody.dueDate) }
        : reqBody,
    );
    console.log({ data });
    const { id: userId } = getDataFromToken(req);
    const newTask = await Task.create({
      ...data,
      userId,
    });
    return NextResponse.json(
      { message: "Created successfully", task: newTask, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
