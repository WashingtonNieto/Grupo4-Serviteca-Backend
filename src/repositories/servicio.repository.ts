import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Servicio, ServicioRelations} from '../models';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Servicio, dataSource);
  }
}
