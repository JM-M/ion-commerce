import { format } from 'date-fns';

const alphabets = 'abcdefghijklmnoprstuvwxyz';
const chars = [
  ...[...Array(10)].map((_, i) => i.toString()),
  ...alphabets.split('').map((char) => char.toUpperCase()),
];

const generateOrderId = () => {
  const date = format(new Date(), 'dd-MM-yyyy');
  let uniqueString = '';
  for (let i = 0; i < 5; i++) {
    uniqueString =
      uniqueString + chars[Math.floor(Math.random() * chars.length)];
  }

  return `${date}-${uniqueString}`;
};

export default generateOrderId;
