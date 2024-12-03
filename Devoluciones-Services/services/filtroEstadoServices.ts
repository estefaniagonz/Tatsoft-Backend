import { DevolucionRepository } from "../repositories/DevolucionesRepository";
import { Devolucion } from "../models/index";

const repository = new DevolucionRepository

export async function obtenerEstado(estado:string): Promise<Devolucion []> {
    return await repository.buscarEstado(estado)
}

