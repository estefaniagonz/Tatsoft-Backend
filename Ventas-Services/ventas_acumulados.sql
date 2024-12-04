Create database ventas_acumulados;
use ventas_acumulados;

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha_entrega DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('PENDIENTE', 'VERIFICADO', 'RECHAZADO') DEFAULT 'PENDIENTE'
);

CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre_producto VARCHAR(120) NOT NULL,
  precio INT NOT NULL,
  descripcion VARCHAR(255),
  cantidad_ingreso INT NOT NULL,
  inventario INT NOT NULL
);

CREATE VIEW detalle_ventas AS
SELECT v.id_venta,
       v.fecha_entrega,
       v.total,
       v.estado,
       p.id_producto,
       p.nombre_producto,
       p.precio, 
       1 AS cantidad,  
       (p.precio * 1) AS subtotal  
FROM ventas v
JOIN productos p ON p.id_producto = v.id_venta;  

select * from detalle_ventas;
select * from ventas;
INSERT INTO ventas (fecha_entrega, total, estado)
VALUES 
('2024-11-20', 500.00, 'PENDIENTE'),
('2024-11-21', 1200.50, 'VERIFICADO'),
('2024-12-12', 300.25, 'RECHAZADO');

