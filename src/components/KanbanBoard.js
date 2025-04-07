import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/columns';

// Exemple de fonction pour récupérer les colonnes
const fetchColumns = async () => {
    const token = localStorage.getItem('token'); 

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des colonnes', error);
    }
};
