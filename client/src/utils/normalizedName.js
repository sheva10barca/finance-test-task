export const normalizedName = (name) => {
  switch (name) {
    case 'AAPL':
      return 'Apple';
    case 'GOOGL':
      return 'Alphabet';
    case 'MSFT':
      return 'Microsoft';
    case 'AMZN':
      return 'Amazon';
    case 'FB':
      return 'Facebook';
    case 'TSLA':
      return 'Tesla';
    default:
      return 'Incode Group';
  }
};
