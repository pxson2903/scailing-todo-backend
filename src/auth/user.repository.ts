import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './entities/auth.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
