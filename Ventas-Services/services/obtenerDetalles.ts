import { VentasRepository } from "../repositories/VentaRepository";

const repository = new VentasRepository();

// Función para obtener los detalles de la venta
export async function obtenerDetalles(id_venta: number): Promise<any[]> {
  try {
    const ventaDetalles = await repository.obtenerDetallesVenta(id_venta);
    return ventaDetalles;
  } catch (error) {
    console.error("Error en el servicio obtenerDetalles:", error);
    throw new Error("Error al obtener los detalles de la venta");
  }
}
