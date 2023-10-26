import { TickerNames } from '../types/TickerNames';

import APPLE_LOGO from '../images/logos/apple-logo.svg';
import GOOGL_LOGO from '../images/logos/Alphabet_Inc_Logo_2015.svg';
import MSFT_LOGO from '../images/logos/Microsoft_logo_(2012).svg';
import AMZN_LOGO from '../images/logos/Amazon_logo.svg';
import FB_LOGO from '../images/logos/facebook.svg';
import TSLA_LOGO from '../images/logos/Tesla_Motors_Logo.svg';
import INCODE_LOGO from '../images/logos/incode.svg';

export const getLogo = (name: string) => {
  switch (name) {
    case TickerNames.APPLE:
      return APPLE_LOGO;
    case TickerNames.ALPHABET:
      return GOOGL_LOGO;
    case TickerNames.MICROSOFT:
      return MSFT_LOGO;
    case TickerNames.AMAZON:
      return AMZN_LOGO;
    case TickerNames.FACEBOOK:
      return FB_LOGO;
    case TickerNames.TESLA:
      return TSLA_LOGO;
    default:
      return INCODE_LOGO;
  }
};
