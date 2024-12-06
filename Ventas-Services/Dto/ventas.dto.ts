class Ventas {
    id_venta: number;
    fecha_entrega: Date;
    total: number;
 
    constructor(
        id_venta: number,
        fecha_entrega: Date,
        total: number,
    ) {
        this.id_venta = id_venta;
        this.fecha_entrega = fecha_entrega;
        this.total = total;
    }
}

export default Ventas;
