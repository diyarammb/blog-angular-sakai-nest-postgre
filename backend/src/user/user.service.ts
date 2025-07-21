// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(data: Partial<User>) {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async findAll() {
        return this.userRepository.find();
    }

    async findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }
}
