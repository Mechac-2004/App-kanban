import { useState, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Task, Id } from "./Types";
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlusIcon";
import { SortableContext } from "@dnd-kit/sortable";
import TaskForm from "./Tache";
import "./columnContainer.css";

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id, taskContent: string, description: string, status: string) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
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
  <div key={task.task_id}> 
    {task.content}
  </div>
))}


      </SortableContext>

      </div>

      <div className="column-footer">
        <button
          className="add-task-btn"
          onClick={() => setShowTaskForm(true)}
        >
          Ajouter une tâche
        </button>
      </div>

      {showTaskForm && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowTaskForm(false)}
            >
              X
            </button>
            <TaskForm
              createTask={(taskContent, description, status) =>
                createTask(column.id, taskContent, description, status)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ColumnContainer;
