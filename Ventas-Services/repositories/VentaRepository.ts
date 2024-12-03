import { Venta } from '../../Ventas-Services/models';
import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export class VentasRepository {
  async buscarPorId(id_venta: number): Promise<Venta | null> {
    const query = `
      SELECT * FROM ventas WHERE id_venta = ?
    `;
    const [rows]: [Venta[], any] = await pool.execute(query, [id_venta]);
    return rows.length > 0 ? rows[0] : null;
  }

  async buscarPorEstado(estado: string): Promise<Venta[]> {
    const query = `SELECT * FROM ventas WHERE LOWER(estado) = LOWER(?)`;
    const [rows]: [Venta[], any] = await pool.execute(query, [estado]);
    return rows;
  }

  async buscarTodasLasVentas(): Promise<Venta[]> {
    const query = `
      SELECT * FROM ventas;
    `;
    const [rows]: [Venta[], any] = await pool.execute(query);
    return rows;
  }

  async buscarPorFecha(fecha_entrega: Date): Promise<Venta[]> {
    const query = `
      SELECT * FROM ventas WHERE DATE(fecha_entrega) = DATE(?)
    `;
    const [rows] = await pool.execute(query, [fecha_entrega.toISOString().split('T')[0]]);
    return rows as Venta[];
  }

  async buscarPorMonto(montoMin: number, montoMax: number): Promise<Venta[]> {
    const query = `
      SELECT * FROM ventas WHERE total BETWEEN ? AND ?
    `;
    const [rows]: [Venta[], any] = await pool.execute(query, [montoMin, montoMax]);
    return rows;
  }

  async obtenerDetallesVenta(id_venta: number): Promise<any[]> {
    try {
      const query = `
        SELECT v.id_venta, v.fecha_entrega, v.total, v.estado, 
               p.id_producto, p.nombre_producto, p.precio, 
               1 AS cantidad, (p.precio * 1) AS subtotal
        FROM ventas v
        JOIN productos p ON 1 = 1
        WHERE v.id_venta = ?
      `;
      const [rows]: [any[], any] = await pool.execute(query, [id_venta]);
      return rows;
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
      throw new Error("Error al consultar la base de datos");
    }
  }
}