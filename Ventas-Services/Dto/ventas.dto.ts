class Ventas {
    id_venta: number;
    fecha_entrega: Date;
    total: number;
    estado: 'PENDIENTE' | 'VERIFICADO' | 'RECHAZADO';

    constructor(
        id_venta: number,
        fecha_entrega: Date,
        total: number,
        estado: 'PENDIENTE' | 'VERIFICADO' | 'RECHAZADO'
    ) {
        this.id_venta = id_venta;
        this.fecha_entrega = fecha_entrega;
        this.total = total;
        this.estado = estado;
    }
}

export default Ventas;
