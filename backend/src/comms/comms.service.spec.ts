import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from '@nestjs/common';
import { MOCK_USERS } from '../../testing/__mocks__/mockUsers';

describe('CommsService', () => {
  let service: CommsService;
  const mockUsersService = {
    getUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommsService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<CommsService>(CommsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException if user is not found', () => {
    mockUsersService.getUser.mockReturnValue(undefined);
    expect(() => service.getNextDeliveryMsg('nonexistent')).toThrow(
      NotFoundException,
    );
  });

  it('should return the correct title and message for a user with 1 cat', () => {
    mockUsersService.getUser.mockReturnValue(MOCK_USERS[0]);
    const result = service.getNextDeliveryMsg('1');
    expect(result.title).toBe('Your next delivery for Cat-One');
    expect(result.message).toBe(
      "Hey User-One! In two days' time, we'll be charging you for your next order for Cat-One's fresh food.",
    );
  });

  it('should return the correct title for a user with 2 cats', () => {
    mockUsersService.getUser.mockReturnValue(MOCK_USERS[1]);
    const result = service.getNextDeliveryMsg('2');
    expect(result.title).toBe('Your next delivery for Cat-One and Cat-Two');
    expect(result.message).toBe(
      "Hey User-Two! In two days' time, we'll be charging you for your next order for Cat-One and Cat-Two's fresh food.",
    );
  });

  it('should return the correct title for a user with 3 cats', () => {
    mockUsersService.getUser.mockReturnValue(MOCK_USERS[2]);
    const result = service.getNextDeliveryMsg('3');
    expect(result.title).toBe(
      'Your next delivery for Cat-One, Cat-Two and Cat-Three',
    );
    expect(result.message).toBe(
      "Hey User-Three! In two days' time, we'll be charging you for your next order for Cat-One, Cat-Two and Cat-Three's fresh food.",
    );
  });

  it('should return the correct title for a user with 4 cats, where the first cat is inactive', () => {
    mockUsersService.getUser.mockReturnValue(MOCK_USERS[3]);
    const result = service.getNextDeliveryMsg('4');
    expect(result.title).toBe(
      'Your next delivery for Cat-Two, Cat-Three and Cat-Four',
    );
    expect(result.message).toBe(
      "Hey User-Four! In two days' time, we'll be charging you for your next order for Cat-Two, Cat-Three and Cat-Four's fresh food.",
    );
  });

  it('should return the correct total price and free gift value as true when price is greater than 120', () => {
    mockUsersService.getUser.mockReturnValue(MOCK_USERS[3]);
    const result = service.getNextDeliveryMsg('4');
    expect(result.totalPrice).toBe(188.25);
    expect(result.freeGift).toBeTruthy();
  });

  it('should return the correct total price and free gift value as false when price is less than 120', () => {
    mockUsersService.getUser.mockReturnValue(MOCK_USERS[0]);
    const result = service.getNextDeliveryMsg('1');
    expect(result.totalPrice).toBe(55.5);
    expect(result.freeGift).not.toBeTruthy();
  });

  // it('should return the correct object for a user with 2 active cats and no free gift', () => {
  //   mockUsersService.getUser.mockReturnValue({
  //     // id: 1,
  //     // firstName: 'User',
  //     cats: [
  //       {
  //         name: 'Cat-One',
  //         subscriptionActive: true,
  //         breed: 'Selkirk Rex',
  //         pouchSize: 'A',
  //       },
  //       {
  //         name: 'Cat-Two',
  //         subscriptionActive: false,
  //         breed: 'Himalayan',
  //         pouchSize: 'B',
  //       },
  //       {
  //         name: 'Cat-Three',
  //         subscriptionActive: true,
  //         breed: 'Chausie',
  //         pouchSize: 'C',
  //       },
  //     ],
  //   });

  //   const result = service.getNextDeliveryMsg('1');
  //   console.log(result);
  //   expect(result).toMatchObject({});
  // });

  // it('should return the correct object for a user with 2 active cats and no free gift', () => {});
});
