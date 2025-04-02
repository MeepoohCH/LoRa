export async function getDataStack() {
    const res = await fetch('http://localhost:3001/node_stack/api')
    if (!res.ok){
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

