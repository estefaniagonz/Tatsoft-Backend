Create database ventas_acumulados;
use ventas_acumulados;

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha_entrega DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
);

CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre_producto VARCHAR(120) NOT NULL,
  precio INT NOT NULL,
  descripcion VARCHAR(255),
  cantidad_ingreso INT NOT NULL,
  inventario INT NOT NULL
);

CREATE OR REPLACE VIEW detalle_ventas AS
SELECT v.id_venta,
       v.fecha_entrega,
       v.total,
       p.id_producto,
       p.nombre_producto,
       p.precio, 
       1 AS cantidad,  
       (p.precio * 1) AS subtotal  
FROM ventas v
JOIN productos p ON p.id_producto = v.id_venta;  


