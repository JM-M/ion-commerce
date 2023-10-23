import IMAGES from '../constants/images';

type Props = { size?: number };

const Logo: React.FC<Props> = ({ size = 30 }) => {
  return <img width='auto' height={size} src={IMAGES.logo} alt='first image' />;
};

export default Logo;
