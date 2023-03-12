import TypographyV2 from 'components/Typography/TypographyV2';

function Circle() {
  return (
    <div className="w-[8px] h-[8px] bg-black rounded-full flex-shrink-0 mt-1" />
  );
}

function Item({ text }: { text: string }) {
  return (
    <div className="flex gap-x-4">
      <Circle />
      <TypographyV2 variant="caption">{text}</TypographyV2>
    </div>
  );
}

type UnOrderedListProps = {
  title: string;
  list: string[];
  className?: string;
};

export function UnOrderedList(props: UnOrderedListProps) {
  const { title, list, className } = props;
  return (
    <div className={`flex flex-col gap-y-5 ${className}`}>
      <TypographyV2 variant="caption">{title}</TypographyV2>
      <div className="flex flex-col gap-y-5">
        {list.map((text) => (
          <Item key={text} text={text} />
        ))}
      </div>
    </div>
  );
}
