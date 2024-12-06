import { param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ObtenerId } from "../services/ObtenerIdServices";

const validatorId = [
    param("id_devolucion")
      .isInt({ min: 1 })
      .withMessage("El ID de la devolución debe ser un número entero mayor a 0")
      .bail()
      .custom(async (value) => {
        const venta = await ObtenerId(Number(value));
        if (!venta) {
          throw new Error("La devolución no existe");
        }
      }),
  ];
  
  function validarId(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    next();
  }
  
  export default {
    validatorId,
    validarId,
  };
  