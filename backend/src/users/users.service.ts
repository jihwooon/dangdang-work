import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { Role } from './user-roles.enum';
import { generateUuid } from '../utils/hash.utils';
import { UsersDogs } from 'src/users/user-dogs.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepo: Repository<Users>,
        @InjectRepository(UsersDogs) private usersDogsRepo: Repository<UsersDogs>
    ) {}

    async create(
        nickname: string,
        role: Role,
        mainDogId: number | undefined,
        oauthId: string,
        oauthAccessToken: string,
        oauthRefreshToken: string,
        refreshToken: string
    ) {
        const user = await this.userRepo.create({
            nickname,
            role,
            mainDogId,
            oauthId,
            oauthAccessToken,
            oauthRefreshToken,
            refreshToken,
        });

        return this.userRepo.save(user);
    }

    async findOne(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: number, attrs: Partial<Users>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('users not found');
        }
        Object.assign(user, attrs);
        return this.userRepo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException('users not found');
        return this.userRepo.remove(user);
    }

    async findOneWithOauthID(oauthId: string) {
        const user = await this.userRepo.findOne({ where: { oauthId } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async loginOrCreateUser(
        oauthId: string,
        oauthAccessToken: string,
        oauthRefreshToken: string,
        refreshToken: string
    ) {
        let user = await this.userRepo.findOne({ where: { oauthId } });

        if (!user) {
            const nickname = await this.generateUniqueNickname();
            user = await this.create(
                nickname,
                Role.User,
                undefined,
                oauthId,
                oauthAccessToken,
                oauthRefreshToken,
                refreshToken
            );
        } else {
            user.oauthAccessToken = oauthAccessToken;
            user.oauthRefreshToken = oauthRefreshToken;
            user.refreshToken = refreshToken;
            await this.userRepo.save(user);
        }

        return user.id;
    }

    async generateUniqueNickname(): Promise<string> {
        let nickname = generateUuid();
        let user = await this.userRepo.findOne({ where: { nickname } });

        while (user) {
            nickname = generateUuid();
            user = await this.userRepo.findOne({ where: { nickname } });
        }

        return nickname;
    }

    async getDogsList(userId: number): Promise<number[]> {
        const foundDogs = await this.usersDogsRepo.find({ where: { userId: 1 } });

        return [1, 2, 3];
    }
}
