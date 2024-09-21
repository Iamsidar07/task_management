"use client";
import React, { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import useBoardStore from "@/store/useBoardStore";
import Column from "./Column";
import { CustomDroppable } from "./CustomDroppable";
import { cn } from "@/lib/utils";

const KanbanBoard = () => {
  const getBoards = useBoardStore((state) => state.getBoards);
  const board = useBoardStore((state) => state.board);
  const setBoardState = useBoardStore((state) => state.setBoardState);
  const updateInDB = useBoardStore((state) => state.updateInDB);
  useEffect(() => {
    getBoards();
  }, [getBoards]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    //  handle column rearrange
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      // take item
      const [removed] = entries.splice(source.index, 1);
      // insert
      entries.splice(destination.index, 0, removed);
      const rearrangeColumn = new Map(entries);
      setBoardState({ ...board, columns: rearrangeColumn });
    }

    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const endColIndex = columns[Number(destination.droppableId)];
    if (!startColIndex || !endColIndex) return;
    const startCol = {
      id: startColIndex[0],
      tasks: startColIndex[1].tasks,
    };

    const endCol = {
      id: endColIndex[0],
      tasks: endColIndex[1].tasks,
    };
    if (!startCol || !endCol) return;
    if (startCol === endCol && source.index === destination.index) return;
    const newTasks = startCol.tasks;
    const [taskMoved] = newTasks.splice(source.index, 1);

    if (startCol.id === endCol.id) {
      // moving in same col
      newTasks.splice(destination.index, 0, taskMoved);
      const newCol = {
        id: startCol.id,
        tasks: newTasks,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      // dragging in another col
      const endTasks = Array.from(endCol.tasks);

      endTasks.splice(destination.index, 0, taskMoved);
      const newCol = {
        id: startCol.id,
        tasks: newTasks,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      newColumns.set(endCol.id, {
        id: endCol.id,
        tasks: endTasks,
      });
      updateInDB(taskMoved, endCol.id);
      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <CustomDroppable type="column" direction="horizontal" droppableId="board">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto rounded-2xl",
              {
                "border border-dashed bg-secondary/30": snapshot.isDraggingOver,
              }
            )}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} tasks={column.tasks} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </CustomDroppable>
    </DragDropContext>
  );
};

export default KanbanBoard;
