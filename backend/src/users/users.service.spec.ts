import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import { UsersService } from './users.service';
import { MOCK_USERS } from '../../testing/__mocks__/mockUsers';

jest.mock('fs');
jest.mock('path');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    // // Mock the return value of fs.readFileSync
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify(MOCK_USERS),
    );
    // // Mock the path.resolve method to return a fake path
    (path.resolve as jest.Mock).mockReturnValueOnce('path/to/data.json');

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct user by id', () => {
    const user = service.getUser('1');
    expect(user).toEqual(MOCK_USERS[0]);
  });
  it('should return undefined if user not found', () => {
    const user = service.getUser('nonexistent');
    expect(user).toBeUndefined();
  });
});
