import { DevolucionRepository } from "../repositories/DevolucionesRepository";
import { Devolucion } from "../models/index";

const repository = new DevolucionRepository

export async function ObtenerId(id_devolucion: number): Promise<Devolucion | null>{
    const devolucion = await repository.buscarId (id_devolucion)
    return devolucion
}