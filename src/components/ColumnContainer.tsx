import { useState, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Task, Id } from "./Types";
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlusIcon";
import Tache from "./Tache";
import { SortableContext } from "@dnd-kit/sortable";
import "./columnContainer.css";

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  return (
    <div ref={setNodeRef} style={style} className="column-container">
      <div
        className="column-header"
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
      >
        <div className="column-title">
          <div className="task-count">{tasks.length}</div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="column-input"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setEditMode(false);
              }}
            />
          )}
        </div>
        <button onClick={() => deleteColumn(column.id)} className="delete-btn">
          <TrashIcon />
        </button>
      </div>

      <div className="task-list">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <Tache
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      <div className="column-footer">
        <button className="add-task-btn" onClick={() => createTask(column.id)}>
          <PlusIcon />
          Ajouter une tâche
        </button>
      </div>
    </div>
  );
}

export default ColumnContainer;
