import { DevolucionRepository } from "../repositories/DevolucionesRepository";
import { Devolucion } from "../models/index"

const repository = new DevolucionRepository

export async function obtenerTodasDevoluciones(): Promise <Devolucion[]> {
    return repository.buscarTodas() 
}

