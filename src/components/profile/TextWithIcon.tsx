import dateIcon from 'assets/svg/calendar.svg';
import editIcon from 'assets/svg/edit.svg';
import downloadIcon from 'assets/svg/download.svg';
import uploadIcon from 'assets/svg/upload.svg';
import uploadDarkIcon from 'assets/svg/upload2.svg';

const icons = {
  date: dateIcon,
  edit: editIcon,
  download: downloadIcon,
  upload: uploadIcon,
  upload_dark: uploadDarkIcon,
};

const TextWithIcon = ({
  icon,
  text,
  addClass,
  textClass,
  iconClass,
}: PropsType) => {
  return (
    <div
      className={`${
        addClass ?? ''
      } flex items-center w-fit text-sm font-inter`}
    >
      <img
        src={icons[icon]}
        alt={icon}
        width={16}
        height={16}
        className={`${iconClass ?? ''}`}
      />
      {text && <span className={`${textClass ?? ''}`}>{text}</span>}
    </div>
  );
};

interface PropsType {
  icon: string;
  text?: string;
  addClass?: string;
  textClass?: string;
  iconClass?: string;
}

export default TextWithIcon;
