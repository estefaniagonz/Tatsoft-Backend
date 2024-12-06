class Devoluciones {
    id_devolucion: number;
    fecha_devolucion: Date;
    motivo: string;
    total: number;


    constructor(
        id_devolucion: number,
        fecha_devolucion: Date,
        motivo: string,
        total: number,
    ) {
        this.id_devolucion = id_devolucion;
        this.fecha_devolucion = fecha_devolucion;
        this.motivo = motivo;
        this.total = total;
    }
}

export default Devoluciones;
