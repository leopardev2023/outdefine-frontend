interface TypographyProps {
  children?: any,
  className?: string,
}

const Typography: React.FC<TypographyProps> = ({children, className = ''}) => {
  return (
    <p className={className}>
      {children}
    </p>
  )
}

export default Typography;
