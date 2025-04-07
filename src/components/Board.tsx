import { useState, useMemo } from "react";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import PlusIcon from "../icons/PlusIcon";
import ColumnContainer from "./ColumnContainer";
import { Column } from "./Types";
import "./board.css";

function Board() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  function deleteColumn(id: string) {
    setColumns(columns.filter((col) => col.id !== id));
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data?.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
  }

  function generateId(): string {
    return Math.floor(Math.random() * 10001).toString();
  }

  return (
    <div className="board-container">
      <DndContext onDragStart={onDragStart}>
        <div className="columns-wrapper">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                deleteColumn={deleteColumn}
              />
            ))}
          </SortableContext>
          <button className="add-column-btn" onClick={createNewColumn}>
            <PlusIcon />
            Ajouter une colonne
          </button>
        </div>
      </DndContext>
    </div>
  );
}

export default Board;
