import { useState, useEffect, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import PlusIcon from "../icons/PlusIcon";
import ColumnContainer from "./ColumnContainer";
import { Column, Task, Id } from "./Types";
import "./Board.css";

function Board() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 3 },
  });
  const sensors = useSensors(sensor);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // Récupération des colonnes et tâches depuis l'API
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch("/api/columns");
        const data = await response.json();
        setColumns(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des colonnes :", error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchColumns();
    fetchTasks();
  }, []);

  // Fonction pour ajouter une nouvelle colonne
  const createNewColumn = async () => {
    const columnName = prompt("Entrez le nom de la nouvelle colonne :");
    if (!columnName) {
      alert("Le nom de la colonne ne peut pas être vide.");
      return;
    }

    const newCol: Column = {
      id: Math.random().toString(36).substr(2, 9),
      title: columnName,
    };

    try {
      const response = await fetch("/api/columns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCol),
      });

      if (response.ok) {
        setColumns([...columns, newCol]);
      } else {
        console.error("Erreur lors de l'ajout de la colonne :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // Fonction pour supprimer une colonne
  const deleteColumn = async (id: Id) => {
    try {
      const response = await fetch(`/api/columns/${id}`, { method: "DELETE" });
      if (response.ok) {
        setColumns(columns.filter((col) => col.id !== id));
        setTasks(tasks.filter((task) => task.columnId !== id));
      } else {
        console.error("Erreur lors de la suppression de la colonne :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // Fonction pour mettre à jour une colonne
  const updateColumn = async (id: Id, title: string) => {
    try {
      const response = await fetch(`/api/columns/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        setColumns(columns.map((col) => (col.id === id ? { ...col, title } : col)));
      } else {
        console.error("Erreur lors de la mise à jour de la colonne :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // Fonction pour créer une tâche
  const createTask = async () => {
    const taskData = {
      title: "Ma première tâche",
      description: "Description de la première tâche",
      status: "Important",
      column_id: 1, // Assurez-vous que columnId est une valeur valide // Assurez-vous que userId est une valeur valide
    };
  
    try {
      const response = await fetch('http://localhost:5173/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      if (response.ok) {
        const task = await response.json();
        console.log('Task created successfully:', task);
      } else {
        const error = await response.json();
        console.log('Error creating task:', error);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };
  

  return (
    <div className="board-container">
      <DndContext
        sensors={sensors}
        onDragStart={(event) => setActiveColumn(event.active.data.current.column)}
        onDragEnd={() => setActiveColumn(null)}
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
              />
            ))}
          </SortableContext>
          {columns.length === 0 && (
            <div className="empty-message">
              Aucune colonne pour l’instant. Cliquez sur "Ajouter une colonne" pour commencer 📝
            </div>
          )}
          <button className="add-column-btn" onClick={createNewColumn}>
            <PlusIcon />
            Ajouter une colonne
          </button>
        </div>
        {createPortal(
          <DragOverlay>{activeColumn && <div>{activeColumn.title}</div>}</DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default Board;
