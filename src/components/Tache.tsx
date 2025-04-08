import { useState } from "react";
import { Task, Id } from "./Types";
import TrashIcon from "../icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Tache.css";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function Tache({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Utilisation de useSortable pour gérer le glisser-déposer de la tâche
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  // Appliquer la transformation de style de glisser-déposer
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef} 
      style={style} 
      className="tache-container"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      {...attributes} 
      {...listeners} 
      onDoubleClick={() => setEditMode(true)} 
    >
      {/* Affichage du contenu de la tâche */}
      {!editMode && task.content}

      {/* Mode édition de la tâche */}
      {editMode && (
        <input
          className="task-edit-input"
          value={task.content}
          onChange={(e) => updateTask(task.id, e.target.value)} 
          autoFocus
          onBlur={() => setEditMode(false)} 
          onKeyDown={(e) => {
            if (e.key === "Enter") setEditMode(false); 
          }}
        />
      )}

      {/* Bouton de suppression de la tâche, visible au survol */}
      {mouseIsOver && (
        <button
          onClick={() => deleteTask(task.id)} 
          className="delete-button"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default Tache;
