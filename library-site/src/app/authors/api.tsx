
export const getAllAuthors = async () => {
    try {
        const response = await fetch('library-api/src/repositories/authors'); // Assurez-vous d'ajuster l'URL de l'API.
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des auteurs.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
