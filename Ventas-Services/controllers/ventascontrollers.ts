import { Request, Response } from "express";
import { obtenerPorIdVentas } from "../services/ObtenerPorId";
import { obtenerTodasLasVentas } from "../services/ObtenerTodaslasVentas";
import { obtenerPorFecha } from "../services/filtroFecha";
import { obtenerDetalles } from "../services/obtenerDetalles";
import { obtenerPorMonto } from "../services/filtroMonto";

export class VentasController {
  async obtenerTodasLasVentas(req: Request, res: Response): Promise<void> {
    try {
      const ventas = await obtenerTodasLasVentas();
      res.status(200).json(ventas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener todas las ventas" });
    }
  }

  async obtenerPorIdVenta(req: Request, res: Response): Promise<void> {
    try {
      const { id_venta } = req.params;
      const venta = await obtenerPorIdVentas(parseInt(id_venta, 10));
      if (!venta) {
        res.status(404).json({ error: "Venta no encontrada" });
        return;
      }
      res.status(200).json(venta);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener venta por ID" });
    }
  }
  async obtenerPorFecha(req: Request, res: Response): Promise<void> {
    try {
      const { fecha_entrega } = req.query;
      if (!fecha_entrega) {
        res.status(400).json({ error: "Fecha de entrega es requerida" });
        return;
      }

      const fecha = new Date(fecha_entrega as string);
      if (isNaN(fecha.getTime())) {
        res.status(400).json({ error: "Fecha inválida" });
        return;
      }

      const ventas = await obtenerPorFecha(fecha);
      if (ventas.length === 0) {
        res.status(404).json({ mensaje: "No se encontraron ventas para la fecha proporcionada." });
        return;
      }

      res.status(200).json(ventas);
    } catch (error) {
      res.status(500).json({ error: "Se ha producido un error al intentar obtener la venta, posiblemente debido a un problema con la fecha proporcionada" });
    }
  }

  async obtenerDetalles(req: Request, res: Response): Promise<void> {
    const id_venta = parseInt(req.params.id_venta, 10);

    if (isNaN(id_venta)) {
      res.status(400).json({ error: "El ID de venta debe ser un número válido" });
      return;
    }

    try {
      const detalles = await obtenerDetalles(id_venta);

      if (!detalles) {
        res.status(404).json({ error: `No se encontraron detalles para la venta con id ${id_venta}` });
        return;
      }

      res.status(200).json(detalles);
    } catch (error) {
      console.error("Error en el controlador obtenerDetalles:", error);
      res.status(500).json({ error: "Error al obtener los detalles de la venta" });
    }
  }

  async obtenerPorMonto(req: Request, res: Response): Promise<void> {
    try {
      if (!req.query) {
        res.status(400).json({ error: "Faltan parámetros en la consulta." });
        return;
      }

      const { montoMin, montoMax } = req.query;
      if (!montoMin || !montoMax) {
        res.status(400).json({ error: "Se requieren monto minimo y monto maximo" });
        return;
      }
      const ventas = await obtenerPorMonto(
        parseFloat(montoMin as string),
        parseFloat(montoMax as string)
      );

      if (ventas.length === 0){
        res.status(404).json({ mensaje: "No se encontraron ventas para el rango de precios"});
        return;
      }

      res.status(200).json(ventas); 
    } catch (error) {
      res.status(500).json({ error: "Error al obtener ventas por monto" });
    }
  }
}