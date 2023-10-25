import APPLE_LOGO from '../images/logos/apple-logo.svg';
import GOOGL_LOGO from '../images/logos/Alphabet_Inc_Logo_2015.svg';
import MSFT_LOGO from '../images/logos/Microsoft_logo_(2012).svg';
import AMZN_LOGO from '../images/logos/Amazon_logo.svg';
import FB_LOGO from '../images/logos/facebook.svg';
import TSLA_LOGO from '../images/logos/Tesla_Motors_Logo.svg';
import INCODE_LOGO from '../images/logos/incode.svg';

export const getLogo = (name) => {
  switch (name) {
    case 'AAPL':
      return APPLE_LOGO;
    case 'GOOGL':
      return GOOGL_LOGO;
    case 'MSFT':
      return MSFT_LOGO;
    case 'AMZN':
      return AMZN_LOGO;
    case 'FB':
      return FB_LOGO;
    case 'TSLA':
      return TSLA_LOGO;
    default:
      return INCODE_LOGO;
  }
};
