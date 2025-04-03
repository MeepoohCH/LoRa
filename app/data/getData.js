export async function getData() {
    try {
        const res = await fetch('http://localhost:3000/api/data');
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw if you want to propagate the error
    }
}
