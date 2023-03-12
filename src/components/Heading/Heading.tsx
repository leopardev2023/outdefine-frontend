interface HeadingProps {
  children?: any;
  className?: string;
  size?: number;
}

const Head = (
  children?: any,
  className?: string
): Record<number, JSX.Element> => {
  return {
    1: <h1 className={className}>{children}</h1>,
    2: <h2 className={className}>{children}</h2>,
    3: <h3 className={className}>{children}</h3>,
    4: <h4 className={className}>{children}</h4>,
  };
};

const Heading: React.FC<HeadingProps> = ({
  children,
  className = '',
  size = 1,
}) => {
  return <>{Head(children, className)[size]}</>;
};

export default Heading;
