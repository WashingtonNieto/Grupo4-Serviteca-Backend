import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly venta: BelongsToAccessor<Venta, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Cliente, dataSource);
    this.venta = this.createBelongsToAccessorFor('venta', ventaRepositoryGetter,);
    this.registerInclusionResolver('venta', this.venta.inclusionResolver);
  }
}
