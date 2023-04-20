import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, userDocument } from './schemas/user.schemas'
import { RegisterDto } from './dtos/register.dto'
import * as CryptoJS from 'crypto-js'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<userDocument>) { }
    async create(dto: RegisterDto) {
        dto.password = CryptoJS.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString();
        const createdUser = new this.userModel(dto);
        await createdUser.save();
    }

    async existsByEmail(email: string): Promise<boolean> {
        const result = await this.userModel.findOne({ email });
        if (result) {
            return true;
        }

        return false

    }

    async getUserByLoginPassword(email: string, password: string): Promise<userDocument | null> {
        const user = await this.userModel.findOne({ email }) as userDocument;


        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.USER_CYPHER_SECRET_KEY);
            const savedPassword = bytes.toString(CryptoJS.enc.Utf8);


            if (password === savedPassword) {
                return user;
            }
        }

        return null;

    }

    async getUserById(id: string) {
        return await this.userModel.findById(id);
    }

}
