import { DevolucionRepository } from "../repositories/DevolucionesRepository";
import { Devolucion } from "../models/index";

const repository = new DevolucionRepository

export async function obtenerFecha(fecha_devolucion:Date): Promise<Devolucion[]> {
    return repository.buscarFecha(fecha_devolucion)
}