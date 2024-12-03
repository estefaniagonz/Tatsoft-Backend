import { Request, Response } from "express";
import { ObtenerId } from "../services/ObtenerIdServices";
import { obtenerDetalles } from "../services/ObtenerDetalleServices";
import { obtenerEstado } from "../services/filtroEstadoServices";
import { obtenerFecha } from "../services/filtroFechaServices";
import { obtenerTodasDevoluciones } from "../services/ObtenerTodasServices";
import { buscarMonto } from "../services/filtroMontoServices";

export class DevolucionController {
  async obtenerDevoluciones(req: Request, res: Response) {
    try {
      const devoluciones = await obtenerTodasDevoluciones();
      res.status(200).json(devoluciones);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener todas las devoluciones" });
    }
  }

  async ObtenerId(req: Request, res: Response): Promise<void> {
    try {
      const { id_devolucion } = req.params;
      const id = parseInt(id_devolucion, 10);

      if (isNaN(id)) {
        res
          .status(400)
          .json({ error: "El ID de devolución debe ser un número válido" });
        return;
      }

      const devolucion = await ObtenerId(id);
      if (!devolucion) {
        res.status(404).json({ error: "Devolución no encontrada" });
        return;
      }
      res.status(200).json(devolucion);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener devolución por ID" });
    }
  }

  async obtenerEstado(req: Request, res: Response): Promise<void> {
    try {
      const { estado } = req.query;
      if (!estado) {
        res.status(400).json({ error: "El estado es requerido" });
        return;
      }
      const devolucion = await obtenerEstado(estado as string);
      if (devolucion.length === 0) {
        res.status(400).json({ message: "No se encontraron devoluciones con ese estado" });
        return;
      }
      res.status(200).json(devolucion);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener devoluciones por estado" });
    }
  }
  
  async obtenerFecha(req: Request, res: Response): Promise<void> {
    try {
      const { fecha_devolucion } = req.query;
      if (!fecha_devolucion) {
        res.status(400).json({ mensaje: "La fecha de devolución es requerida" });
        return;
      }
      const fecha = new Date(fecha_devolucion as string);
      if (isNaN(fecha.getTime())) {
        res.status(400).json({ error: "Fecha inválida" });
        return;
      }
  
      const devolucion = await obtenerFecha(fecha);
      if (devolucion.length === 0) {
        res.status(400).json({
          mensaje: "No se encontraron devoluciones para la fecha proporcionada",
        });
        return;
      }
  
      res.status(200).json(devolucion);
    } catch (error) {
      res.status(500).json({
        error:
          "Se ha producido un error al intentar obtener la devolución, posiblemente debido a un problema con la fecha proporcionada",
      });
    }
  }
  

  async obtenerDetalle(req: Request, res: Response): Promise<void> {
    try {
      const { id_devolucion } = req.params;
      const detalles = await obtenerDetalles(parseInt(id_devolucion, 10));
      if (!detalles) {
        res.status(404).json({ error: "Devolución no encontrada" });
        return;
      }
      if (detalles.length === 0) {
        res.status(200).json({ mensaje: "La devolución no tiene detalles asociados" });
        return;
      }
      res.status(200).json(detalles);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener detalles de la devolución" });
    }
  }

  async buscarMonto(req: Request, res: Response): Promise<void> {
    try {
      if (!req.query) {
        res.status(400).json({ error: "Faltan parámetros en la consulta." });
        return;
      }

      const { montoMin, montoMax } = req.query;
      if (!montoMin || !montoMax) {
        res.status(400) .json({error: "se requiere monto minimo y monto maximo para la consulta",});
        return;
      }
      const devoluciones = await buscarMonto(
        parseFloat(montoMin as string),
        parseFloat(montoMax as string)
      );

      if (devoluciones.length === 0) {
        res
          .status(400)
          .json({
            mensaje: "No se encontraron devoluciones en el rango de precios",
          });
        return;
      }
      res.status(200).json(devoluciones);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener devolución por monto" });
    }
  }
}
