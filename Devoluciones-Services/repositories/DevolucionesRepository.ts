import { Devolucion } from "../models";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

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

export class DevolucionRepository {
  async buscarId(id_devolucion: number): Promise<Devolucion | null> {
    const query = `
      SELECT * FROM devoluciones WHERE id_devolucion = ?;
    `;
    const [rows]: [Devolucion[], any] = await pool.execute(query, [
      id_devolucion,
    ]);
    return rows.length > 0 ? rows[0] : null;
  }

  async buscarEstado(estado: string): Promise<Devolucion[]> {
    const query = `SELECT * FROM devoluciones WHERE LOWER(estado) = LOWER(?);`;
    const [rows]: [Devolucion[], any] = await pool.execute(query, [estado]);
    return rows;
  }

  async buscarTodas(): Promise<Devolucion[]> {
    const query = `SELECT * FROM devoluciones;`;
    const [rows]: [Devolucion[], any] = await pool.execute(query);
    return rows;
  }

  async buscarFecha(fecha_devolucion: Date): Promise<Devolucion[]> {
    const query = `SELECT * FROM devoluciones WHERE DATE(fecha_devolucion) = DATE(?);`;
    const [rows]: [Devolucion[], any] = await pool.execute(query, [
      fecha_devolucion.toISOString().split("T")[0],
    ]);
    return rows;
  }

  async buscarMonto(montoMin: number, montoMax: number): Promise<Devolucion[]> {
    const query = `
      SELECT * 
      FROM devoluciones 
      WHERE total BETWEEN ? AND ?;
    `;
    const [rows]: [Devolucion[], any] = await pool.execute(query, [
      montoMin,
      montoMax,
    ]);
    return rows;
  }

  async DetalleDevolucion(id_devolucion: number): Promise<Devolucion[]> {
    const query = `
      SELECT * 
      FROM detalles_devoluciones
      WHERE id_devolucion = ?;
    `;
    const [rows]: [Devolucion[], any] = await pool.execute(query, [
      id_devolucion,
    ]);
    return rows;
  }
}
