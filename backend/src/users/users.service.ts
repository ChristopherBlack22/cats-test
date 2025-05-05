import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UserType } from 'src/common/types';

@Injectable()
export class UsersService {
  private users: UserType[];
  constructor() {
    const filePath = path.resolve(__dirname, '../../../data.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    this.users = JSON.parse(raw);
  }
  getUser(id: string): UserType | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}
