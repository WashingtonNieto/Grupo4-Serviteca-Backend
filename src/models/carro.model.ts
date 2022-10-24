import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Venta} from './venta.model';

@model()
export class Carro extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  anio: string;

  //@belongsTo(() => Venta)
  //ventaId: string;

  @hasMany(() => Venta)
  ventas: Venta[];

  constructor(data?: Partial<Carro>) {
    super(data);
  }
}

export interface CarroRelations {
  // describe navigational properties here
}

export type CarroWithRelations = Carro & CarroRelations;
