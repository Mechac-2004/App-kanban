import { useState } from "react";
import "./style.css";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
};

const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Première tâche",
      description: "Description de la première tâche",
      status: "todo",
    },
    {
      id: "2",
      title: "Tâche en cours",
      description: "Description de la tâche en cours",
      status: "in-progress",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: "todo",
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "" });
  };

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

  
  };

  return (
    <div className="kanban-container">

      <button className="logout-button">
        Déconnexion
      </button>

      <h1>Bienvenue sur votre application Kanban</h1>
      <p>Gérez vos tâches efficacement</p>

      {/* Formulaire d'ajout */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleAddTask}>Ajouter une tâche</button>
      </div>

      {/* Tableau Kanban */}
      <div className="kanban-board">
        {/* Colonne À faire */}
        <div className="kanban-column">
          <h2>À faire</h2>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <TaskCard key={task.id} task={task} onMove={moveTask} />
            ))}
        </div>

        {/* Colonne En cours */}
        <div className="kanban-column">
          <h2>En cours</h2>
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <TaskCard key={task.id} task={task} onMove={moveTask} />
            ))}
        </div>

        {/* Colonne Terminé */}
        <div className="kanban-column">
          <h2>Terminé</h2>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <TaskCard key={task.id} task={task} onMove={moveTask} />
            ))}
        </div>
      </div>
    </div>
  );
};

// Composant TaskCard
const TaskCard = ({
  task,
  onMove,
}: {
  task: Task;
  onMove: (id: string, status: Task["status"]) => void;
}) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-actions">
        {task.status !== "todo" && (
          <button onClick={() => onMove(task.id, "todo")}>← À faire</button>
        )}
        {task.status !== "in-progress" && (
          <button onClick={() => onMove(task.id, "in-progress")}>
            En cours →
          </button>
        )}
        {task.status !== "done" && (
          <button onClick={() => onMove(task.id, "done")}>Terminé →</button>
        )}
      </div>
    </div>
  );
};

export default Kanban;