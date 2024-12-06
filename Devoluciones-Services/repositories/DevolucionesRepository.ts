import { Devolucion } from "../models";
import mysql, { RowDataPacket } from "mysql2/promise";
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

interface DevolucionRow extends RowDataPacket {
  id_devolucion: number;
  fecha_devolucion: Date;
  motivo: string;
  total: number;
  valor_devolucion: number;
}

export class DevolucionRepository {
  async buscarId(id_devolucion: number): Promise<Devolucion | null> {
    const query = `SELECT * FROM devoluciones WHERE id_devolucion = ?;`;
    const [rows] = await pool.execute<DevolucionRow[]>(query, [id_devolucion]);
    return rows.length > 0 ? rows[0] : null;
  }

  async crearDevolucion(devolucion: Partial<Devolucion>): Promise<Devolucion> {
    const query = `
      INSERT INTO devoluciones (fecha_devolucion, motivo, total, valor_devolucion)
      VALUES (?, ?, ?, ?);
    `;
    const { fecha_devolucion, motivo, total, valor_devolucion } = devolucion;
    const [result] = await pool.execute(query, [
      fecha_devolucion,
      motivo,
      total,
      valor_devolucion,
    ]);

    return {
      id_devolucion: (result as any).insertId,
      fecha_devolucion: fecha_devolucion!,
      motivo: motivo!,
      total: total!,
      valor_devolucion: valor_devolucion!,
    } as Devolucion;
  }

  async actualizarDevolucion(
    id_devolucion: number,
    datosActualizados: Partial<Devolucion>
  ): Promise<Devolucion | null> {
    const query = `
      UPDATE devoluciones
      SET fecha_devolucion = ?, motivo = ?, total = ?, valor_devolucion = ?
      WHERE id_devolucion = ?;
    `;
    const { fecha_devolucion, motivo, total, valor_devolucion } =
      datosActualizados;
    await pool.execute(query, [
      fecha_devolucion,
      motivo,
      total,
      valor_devolucion,
      id_devolucion,
    ]);
    return this.buscarId(id_devolucion);
  }
  async borrarDevolucion(id_devolucion: number): Promise<boolean> {
    const query = `
        DELETE FROM devoluciones 
        WHERE id_devolucion = ?;
    `;

    try {
      const [result] = await pool.execute(query, [id_devolucion]);
      return (result as any).affectedRows > 0;
    } catch (error) {
      console.error("Error al borrar la devolución:", error);
      return false;
    }
  }
  async buscarTodas(): Promise<Devolucion[]> {
    const query = `SELECT * FROM devoluciones;`;
    const [rows] = await pool.execute<DevolucionRow[]>(query);
    return rows;
  }

  async buscarFecha(fecha_devolucion: Date): Promise<Devolucion[]> {
    const query = `SELECT * FROM devoluciones WHERE DATE(fecha_devolucion) = DATE(?);`;
    const [rows] = await pool.execute<DevolucionRow[]>(query, [
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
    const [rows] = await pool.execute<DevolucionRow[]>(query, [
      montoMin,
      montoMax,
    ]);
    return rows;
  }

  async detalleDevolucion(id_devolucion: number): Promise<Devolucion[]> {
    const query = `
      SELECT *
      FROM detalles_devoluciones
      WHERE id_devolucion = ?;
    `;
    const [rows] = await pool.execute<DevolucionRow[]>(query, [id_devolucion]);
    return rows;
  }
}
