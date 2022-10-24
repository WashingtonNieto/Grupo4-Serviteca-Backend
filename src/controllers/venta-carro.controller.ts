import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Carro,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaCarroController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/carro', {
    responses: {
      '200': {
        description: 'Carro belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carro)},
          },
        },
      },
    },
  })
  async getCarro(
    @param.path.string('id') id: typeof Venta.prototype.id,
  ): Promise<Carro> {
    return this.ventaRepository.carro(id);
  }
}
