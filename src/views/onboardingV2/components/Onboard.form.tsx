type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
};
export const Label = (props: LabelProps) => {
  const { children, htmlFor, className } = props;
  return (
    <label
      className={`text-xs inline-block font-normal font-poppins ${className}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export const FormControl = ({ children, className = "" }) => {
  return (
    <div className={`w-full md:w-64 lg:w-72 flex flex-col gap-y-3 ${className}`}>
      {children}
    </div>
  );
};

type InputContainerProps = {
  className?: string;
  children: React.ReactNode;
};
export const InputContainer = ({
  children,
  className,
}: InputContainerProps) => {
  return (
    <div
      className={`flex-column flex-nowrap md:flex justify-between ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

type IOnboardHeading = {
  className?: string;
  children: React.ReactNode;
};
export const OnboardHeading = ({ className, children }: IOnboardHeading) => {
  return (
    <span
      className={`inline-block font-poppins font-semibold text-sm text-black ${
        className ?? ""
      }`}
    >
      {children}
    </span>
  );
};
