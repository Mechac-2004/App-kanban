import { useState, useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon.tsx";
import ColumnContainer from "./ColumnContainer";
import { Column, Task, Id } from "./Types";
import "./Board.css";

function Board() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    },
  });
  const sensors = useSensors(sensor);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const generateId = (): string => Math.floor(Math.random() * 10001).toString();

  const deleteColumn = (id: Id) => {
    setColumns(columns.filter((col) => col.id !== id));
    setTasks(tasks.filter((task) => task.columnId !== id));
  };

  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) =>
      col.id === id ? { ...col, title } : col
    );
    setColumns(newColumns);
  };

  const createNewColumn = () => {
    const newCol: Column = {
      id: generateId(),
      title: `Colonne ${columns.length + 1}`,
    };
    setColumns([...columns, newCol]);
  };

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Tâche ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: Id, content: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, content } : t
    );
    setTasks(updated);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data?.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }

    if (event.active.data?.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      setActiveColumn(null);
      setActiveTask(null);
      return;
    }

    if (active.data?.current?.type === "Column") {
      setColumns((cols) => {
        const oldIndex = cols.findIndex((col) => col.id === activeId);
        const newIndex = cols.findIndex((col) => col.id === overId);
        return arrayMove(cols, oldIndex, newIndex);
      });
      setActiveColumn(null);
    }

    if (active.data?.current?.type === "Task") {
      // Deplacement de la tâche entre les colonnes
      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeId ? { ...task, columnId: overId } : task
        )
      );
      setActiveTask(null);
    }
  };

  return (
    <div className="board-container">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="columns-wrapper">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter((t) => t.columnId === col.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </SortableContext>
          {columns.length === 0 && (
            <div style={{ color: "white", textAlign: "center", margin: "2rem auto" }}>
              Aucune colonne pour l’instant. Cliquez sur "Ajouter une colonne" pour commencer 📝
            </div>
          )}
          <button className="add-column-btn" onClick={createNewColumn}>
            <PlusIcon />
            Ajouter une colonne
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter((t) => t.columnId === activeColumn.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default Board;
