import { mysqlPool } from '@/utils/db';

export async function GET(request) {
  try {
    const promisePool = mysqlPool.promise();

    // ใช้ JOIN เพื่อรวมข้อมูลจาก node_stack และ node_properties ที่ devAddr ตรงกัน
    const [rows] = await promisePool.query(`
      SELECT node_stack.*, node_properties.* 
      FROM node_stack 
      JOIN node_properties ON node_stack.devEUI = node_properties.DevEUI
      WHERE node_stack.timestamp >= NOW() - INTERVAL 6 HOUR
      ORDER BY node_stack.timestamp DESC
    `);

    // ส่งข้อมูลที่รวมกันแล้วกลับไปเป็น JSON
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('DB Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
