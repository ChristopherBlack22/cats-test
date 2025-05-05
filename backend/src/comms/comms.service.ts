import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {
  POUCH_PRICES,
  FREE_GIFT_THRESHOLD,
  NEXT_DELIVERY_COMMS_TXT,
} from 'src/common/constants';
import { formatList } from 'src/common/utils';
import { NextDeliveryMsgType } from 'src/common/types';

@Injectable()
export class CommsService {
  constructor(private readonly userService: UsersService) {}

  getNextDeliveryMsg(id: string): NextDeliveryMsgType {
    const user = this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException();
    }

    let totalPrice = 0;
    const activeCats: string[] = [];
    user.cats.forEach((cat) => {
      if (cat.subscriptionActive) {
        activeCats.push(cat.name);
        const price = parseFloat(POUCH_PRICES[cat.pouchSize] || '0');
        totalPrice += price;
      }
    });

    totalPrice = parseFloat(totalPrice.toFixed(2));
    const freeGift = totalPrice > FREE_GIFT_THRESHOLD;

    const formattedCats = formatList(activeCats);
    const title = NEXT_DELIVERY_COMMS_TXT.title.replace(
      '<catNames>',
      formattedCats,
    );
    const message = NEXT_DELIVERY_COMMS_TXT.message
      .replace('<firstName>', user.firstName)
      .replace('<catNames>', formattedCats);

    return {
      title,
      message,
      totalPrice,
      freeGift,
    };
  }
}
