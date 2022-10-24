import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Carro,
  Venta,
} from '../models';
import {CarroRepository} from '../repositories';

export class CarroVentaController {
  constructor(
    @repository(CarroRepository) protected carroRepository: CarroRepository,
  ) { }

  @get('/carros/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Carro has many Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Venta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta[]> {
    return this.carroRepository.ventas(id).find(filter);
  }

  @post('/carros/{id}/ventas', {
    responses: {
      '200': {
        description: 'Carro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInCarro',
            exclude: ['id'],
            optional: ['carroId']
          }),
        },
      },
    }) venta: Omit<Venta, 'id'>,
  ): Promise<Venta> {
    return this.carroRepository.ventas(id).create(venta);
  }

  @patch('/carros/{id}/ventas', {
    responses: {
      '200': {
        description: 'Carro.Venta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Partial<Venta>,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.carroRepository.ventas(id).patch(venta, where);
  }

  @del('/carros/{id}/ventas', {
    responses: {
      '200': {
        description: 'Carro.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.carroRepository.ventas(id).delete(where);
  }
}
