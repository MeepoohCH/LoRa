import { mysqlPool } from '@/utils/db';

export async function GET(request) {
  try {
    const promisePool = mysqlPool.promise();
    const [rows, fields] = await promisePool.query(
     `SELECT * FROM node_stack 
   WHERE timestamp >= NOW() - INTERVAL 6 HOUR 
   ORDER BY timestamp DESC`
    );
    

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('DB Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
