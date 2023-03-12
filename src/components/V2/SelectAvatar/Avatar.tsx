type AvatarProps = {
    url: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
    innerClass?: string;
};
const Avatar = ({ url, onClick, className, innerClass }: AvatarProps) => {
  return (
      <div
        onClick={onClick}
        className={`w-[55px] h-[55px] shrink-0 rounded-[8px] bg-white border border-white cursor-pointer ${
          className ?? ""
        }`}
      >
        <img
          src={url}
          alt='avatar'
          className={`w-full h-full bg-cover rounded-[8px] ${innerClass ?? ""}`}
        />
      </div>
  );
};

export default Avatar;
