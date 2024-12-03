import { VentasRepository } from "../repositories/VentaRepository";
import { Venta } from "../models";

const repository = new VentasRepository();

export async function obtenerPorFecha(fecha_entrega: Date): Promise<Venta[]> {
  return repository.buscarPorFecha(fecha_entrega);
}
