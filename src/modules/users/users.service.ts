import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/database/mongoose/schemas/user.schema';
import { Model } from 'mongoose';
import { UserType } from './types';
import { hashData } from 'src/utilities';
import { AdminUser } from 'src/database/mongoose/schemas/adminuser.schema';
import { UserSafeType } from './types/users-safe.type';
import { ChangePasswordType } from './types/change-password.type';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserType>,
    @InjectModel(AdminUser.name)
    private readonly adminUserModel: Model<UserType>,
  ) { }

  async changeUserPassword(
    changedPasswordDto: ChangePasswordType
  ): Promise<boolean> {
    const hashedPassword = await hashData(changedPasswordDto.password);
    await this.findUserByEmailAndUpdate(changedPasswordDto.email, {
      password: hashedPassword,
    });
    return true;
  }

  async changeAdminPassword(
    changedPasswordDto: ChangePasswordType
  ): Promise<boolean> {
    const hashedPassword = await hashData(changedPasswordDto.password);
    await this.findAdminByEmailAndUpdate(changedPasswordDto.email, {
      password: hashedPassword,
    });
    return true;
  }

  async createUser(
    userDto: UserType,
    options: any = {}
  ): Promise<UserType> {
    const { lean = true } = options;
    const user = new this.userModel(userDto);
    const createdUser = await user.save();
    if (!lean) {
      return createdUser;
    }

    return createdUser?.toObject();
  }

  async createAdminUser(
    userDto: UserType,
    options: any = {}
  ): Promise<UserType> {
    const { lean = true } = options;

    const admin = new this.adminUserModel(userDto);
    const createdAdmin = await admin.save();

    if (!lean) {
      return createdAdmin;
    }

    return createdAdmin?.toObject();
  }

  async findUserByEmailAndUpdate(
    email: string,
    data: Partial<UserType>
  ): Promise<UserSafeType> {
    return await this.userModel
      .findOneAndUpdate({ email }, { $set: { ...data } }, { new: true })
      .select('-password');
  }

  async findAdminByEmailAndUpdate(
    email: string,
    data: Partial<UserType>
  ): Promise<UserSafeType> {
    return await this.adminUserModel
      .findOneAndUpdate({ email }, { $set: { ...data } }, { new: true })
      .select('-password');
  }

  async findUserByIdAndUpdate(
    userId: string,
    data: Partial<UserType> | UserType,
  ): Promise<UserType> {
    return this.userModel.findByIdAndUpdate(userId, data, { new: true }).exec();
  }

  async updateAdminUser(
    userId: string,
    data: Partial<UserType> | UserType
  ): Promise<UserType> {
    return this.adminUserModel.findByIdAndUpdate(userId, data, { new: true }).exec();
  }

  async findUserById(
    userID: string
  ): Promise<UserType | null> {
    const user = await this.userModel.findById({ _id: userID }).exec();
    return user;
  }

  async findAdminUserById(
    userID: string
  ): Promise<UserType | undefined> {
    const user = await this.adminUserModel.findById({ _id: userID }).exec();
    return user;
  }

  async findUserByUsername(
    username: string
  ): Promise<UserType | undefined> {
    const user = await this.userModel.findOne({ username }, { hashed_refreshtoken: 0 }).exec();
    return user?.toObject();
  }

  async findAdminUserByUsername(
    username: string
  ): Promise<UserType | undefined> {
    const user = await this.adminUserModel.findOne({ username }, { hashed_refreshtoken: 0 }).exec();
    return user?.toObject();
  }

  async findUserByEmail(email: string): Promise<UserType | undefined> {
    const user = await this.userModel
      .findOne({ email }, { hashed_refreshtoken: 0, password: 0 })
      .exec();
    return user?.toObject();
  }

  async findAdminUserByEmail(email: string): Promise<UserType | undefined> {
    const user = await this.adminUserModel
      .findOne({ email }, { hashed_refreshtoken: 0, password: 0 })
      .exec();
    return user?.toObject();
  }

  async updateUserRtHash(id: string, rt: string): Promise<void> {
    const hashedRt = await hashData(rt);
    await this.userModel.findByIdAndUpdate(id, { hashed_refreshtoken: hashedRt });
  }
  async updateAdminRtHash(id: string, rt: string): Promise<void> {
    const hashedRt = await hashData(rt);
    await this.adminUserModel.findByIdAndUpdate(id, { hashed_refreshtoken: hashedRt });
  }

  async logoutUser(userId: string): Promise<void> {
    const filter = { _id: userId, hashed_refreshtoken: { $ne: null } };
    await this.userModel.findByIdAndUpdate(filter, { hashed_refreshtoken: null }, { new: true });
  }

  async logoutAdminUser(userId: string): Promise<void> {
    const filter = { _id: userId, hashed_refreshtoken: { $ne: null } };
    await this.adminUserModel.findByIdAndUpdate(
      filter,
      { hashed_refreshtoken: null },
      { new: true },
    );
  }

  async checkUsername(userName: string): Promise<{ available: boolean }> {
    const user = await this.userModel.findOne({ username: userName }).exec();
    return { available: !user };
  }
  async checkAdminUsername(userName: string): Promise<{ available: boolean }> {
    const user = await this.adminUserModel.findOne({ username: userName }).exec();
    return { available: !user };
  }
}
