import { useNavigate } from 'react-router-dom';
import Logo from 'assets/svg/logo.svg';
import DarkLogo from 'assets/svg/dark-logo.svg';

interface PropTypes {
  dark?: boolean;
  textSize?: string;
  logoSize?: string;
  className?: string;
}

const LogoText: React.FC<PropTypes> = ({
  dark = false,
  textSize = '1.25',
  logoSize = 'auto',
  className = '',
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`relative flex items-center cursor-pointer ${className}`}
        onClick={() => navigate('/')}
      >
        <img src={dark ? DarkLogo : Logo} width={`${logoSize}px`} alt='logo' />
        <div className='relative'>
          <span
            className={`ml-4 font-[Montserrat] tracking-[0.2rem] font-extrabold text-[${textSize}rem] ${
              dark ? 'text-theme' : 'text-primary'
            }`}
          >
            OUTDEFINE
          </span>
          <span
            className={`absolute font-montserrat font-bold left-4 top-7 text-xs tracking-[0.2rem] ${
              dark ? 'text-theme' : 'text-primary'
            }`}
          >
            BETA
          </span>
        </div>
      </div>
    </>
  );
};

export default LogoText;
