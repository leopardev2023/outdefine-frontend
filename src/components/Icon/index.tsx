import { IconName, icons, injectSVGProps } from "./assets";

interface Props {
  size?: number;
  className?: string;
  alt?: string;
  name: IconName
};

function Icon ({ size, className, name, alt }: Props) {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return (
    <>
      {injectSVGProps(icon, {
        className
      })}
      <span className="sr-only">{alt || name}</span>
    </>
  )
}

export default Icon;
