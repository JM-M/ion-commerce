import { BsStar, BsStarFill } from 'react-icons/bs';

interface Props {
  max: number;
  value: number;
  setValue: Function;
}

const Rating = ({ max = 5, value, setValue = () => null }: Props) => {
  return (
    <div className='flex gap-2 my-2 text-pri'>
      {[...Array(5)].map((_, i) => {
        const rating = i + 1;
        if (rating <= +value)
          return (
            <BsStarFill key={i} size={26} onClick={() => setValue(rating)} />
          );
        return <BsStar key={i} size={26} onClick={() => setValue(rating)} />;
      })}
    </div>
  );
};

export default Rating;
