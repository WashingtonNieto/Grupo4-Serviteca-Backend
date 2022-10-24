import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Venta, VentaRelations, Carro, Cliente, Servicio} from '../models';
import {CarroRepository} from './carro.repository';
import {ClienteRepository} from './cliente.repository';
import {ServicioRepository} from './servicio.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly carro: BelongsToAccessor<Carro, typeof Venta.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Venta.prototype.id>;

  public readonly servicio: BelongsToAccessor<Servicio, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('CarroRepository') protected carroRepositoryGetter: Getter<CarroRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Venta, dataSource);
    this.servicio = this.createBelongsToAccessorFor('servicio', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.carro = this.createBelongsToAccessorFor('carro', carroRepositoryGetter,);
    this.registerInclusionResolver('carro', this.carro.inclusionResolver);
  }
}
