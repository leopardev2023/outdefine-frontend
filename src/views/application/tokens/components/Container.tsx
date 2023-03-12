type ContainerProps = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

export function Container(props: ContainerProps) {
  const cls = `${props.className} w-full px-4 py-5 mt-[46px]`;
  return <div className={cls}>{props.children}</div>;
}
