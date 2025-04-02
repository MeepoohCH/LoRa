export async function getDataCombine() {
    try {
        const res = await fetch('http://localhost:3001/node_combine/api');
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw if you want to propagate the error
    }
}
