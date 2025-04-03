import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = "http://127.0.0.1:8000/api/columns";

function KanbanBoard() {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => setColumns(response.data))
            .catch(error => console.error("Erreur:", error));
    }, []);

    return (
        <div>
            {columns.map(column => (
                <div key={column.id}>
                    <h2>{column.name}</h2>
                </div>
            ))}
        </div>
    );
}

export default KanbanBoard;
