class Devoluciones {
    id_devolucion: number;
    fecha_devolucion: Date;
    motivo: string;
    total: number;
    valor_devolucion: number;
    id_producto:number;

    constructor(
        id_devolucion: number,
        fecha_devolucion: Date,
        motivo: string,
        total: number,
        valor_devolucion: number,
        id_producto:number
    ) {
        this.id_devolucion = id_devolucion;
        this.fecha_devolucion = fecha_devolucion;
        this.motivo = motivo;
        this.total = total;
        this.valor_devolucion = valor_devolucion;
        this.id_producto = id_producto
    }
}

export default Devoluciones;
