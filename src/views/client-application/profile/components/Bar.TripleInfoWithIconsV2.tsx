import { ReactElement } from "react";

const TripleInfoWithIconsV2 = (props: IInfoBarV2): ReactElement => {
  const length = Math.min(props.texts.length, props.icons.length);

  return (
    <div className={`flex justify-center flex-wrap text-dark-gray font-semibold text-sm ${props.wrapperClass ?? ""}`}>
      {props.texts.slice(0, length).map((text, index) => (
        <span
          key={text + index}
          className={`flex items-center gap-2 ${props.elementClass ?? ""}`}
        >
          {props.icons[index]}
          <span className={props.textWrapperClass ?? ""}>{text}</span>
        </span>
      ))}
    </div>

  );
};

export default TripleInfoWithIconsV2;
