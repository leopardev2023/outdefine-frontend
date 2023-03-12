import LogoIcon from 'assets/svg/logo.svg';
import DarkLogoIcon from 'assets/svg/dark-logo.svg';

interface PropsType {
  beta?: boolean;
  dark?: boolean;
  className?: string;
}

const Logo: React.FC<PropsType> = ({ beta = true, dark = false, className = '' }) => {
  return (
    <>
      <div className={`flex flex-col items-center ${className}`}>
        {dark ? <img src={DarkLogoIcon} alt='logo' /> : <img src={LogoIcon} alt='logo' />}
        {beta && (
          <span
            className={`${
              dark ? 'text-theme' : 'text-primary'
            } font-montserrat font-bold left-14 top-8 text-xs tracking-[0.2rem] mt-2`}
          >
            BETA
          </span>
        )}
      </div>
    </>
  );
};

export default Logo;
