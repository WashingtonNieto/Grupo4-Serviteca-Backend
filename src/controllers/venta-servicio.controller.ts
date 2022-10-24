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
  Servicio,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaServicioController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/servicio', {
    responses: {
      '200': {
        description: 'Servicio belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async getServicio(
    @param.path.string('id') id: typeof Venta.prototype.id,
  ): Promise<Servicio> {
    return this.ventaRepository.servicio(id);
  }
}
