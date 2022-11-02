import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Venta,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteVentaController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/venta', {
    responses: {
      '200': {
        description: 'Venta belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Venta)},
          },
        },
      },
    },
  })
  async getVenta(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Venta> {
    return this.clienteRepository.venta(id);
  }
}
