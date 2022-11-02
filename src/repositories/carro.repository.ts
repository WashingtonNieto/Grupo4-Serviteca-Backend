import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Carro, CarroRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class CarroRepository extends DefaultCrudRepository<
  Carro,
  typeof Carro.prototype.id,
  CarroRelations
> {

  public readonly ventas: HasManyRepositoryFactory<Venta, typeof Carro.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Carro, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventaRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
  }
}
