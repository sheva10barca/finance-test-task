import { TickerNames } from '../types/TickerNames';

export const normalizedName = (name: string) => {
  switch (name) {
    case TickerNames.APPLE:
      return 'Apple';
    case TickerNames.ALPHABET:
      return 'Google Alphabet';
    case TickerNames.MICROSOFT:
      return 'Microsoft';
    case TickerNames.AMAZON:
      return 'Amazon';
    case TickerNames.FACEBOOK:
      return 'Facebook';
    case TickerNames.TESLA:
      return 'Tesla';
    default:
      return name;
  }
};
