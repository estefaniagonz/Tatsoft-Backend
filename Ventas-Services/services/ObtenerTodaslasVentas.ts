import { VentasRepository } from "../repositories/VentaRepository";
import { Venta } from "../models";

const repository = new VentasRepository();

export async function obtenerTodasLasVentas(): Promise<Venta[]> {
  return repository.buscarTodasLasVentas();
}
