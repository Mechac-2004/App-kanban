import { useState } from "react";
import "./Tache.css";

function TaskForm() {
  const [taskContent, setTaskContent] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("en cours");
  const [column, setColumn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!taskContent || !description || !status || !column) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    const newTask = {
      title: taskContent,
      description,
      status,
      column,
    };

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'enregistrement de la tâche.");
      }

      alert("Tâche ajoutée avec succès !");
      // Réinitialiser les champs
      setTaskContent("");
      setDescription("");
      setStatus("en cours");
      setColumn("");
    } catch (err: any) {
      setError(err.message || "Une erreur inconnue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Ajouter une nouvelle tâche</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskContent">Titre de la tâche :</label>
          <input
            type="text"
            id="taskContent"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Statut :</label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="column">Colonne :</label>
          <input
            type="text"
            id="column"
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : "Ajouter la tâche"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
