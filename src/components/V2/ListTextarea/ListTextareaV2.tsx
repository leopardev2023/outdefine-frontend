import { ChangeEvent, ReactElement, useState } from 'react';
import makeFormat from './formatMaker';

// import lists svg
import { ReactComponent as ListIconSvg } from 'assets/V2/svg/list-textarea.svg';

const ListTextareaV2: React.FC<IListTextareaV2> = (
  props: IListTextareaV2
): ReactElement => {
  const [focus, setFocus] = useState<boolean>(false);

  const strClassName = makeFormat({
    focus,
    disabled: props.disabled,
    lists: props.lists,
  });

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.disabled || !props.onChange) return;
    const listdata = e.target.value.split('\n');
    props.onChange(listdata.length === 1 && listdata[0] === '' ? [] : listdata);
  };

  return (
    <>
      {focus && (
        <span
          onClick={() => setFocus(false)}
          className='fixed w-screen h-screen top-0 left-0'
        />
      )}

      <div
        onBlur={() => setFocus(false)}
        className={`relative font-inter text-xs`}
      >
        <ListIconSvg className='absolute right-4 top-[10px]' />
        <textarea
          id={props.id}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={onChangeHandler}
          value={props.lists.join('\n')}
          disabled={props.disabled}
          className={`resize-none w-full leading-[18px] ${
            props.className ?? ''
          } ${strClassName ?? ''} overflow-y-hidden caret-black text-white/0`}
          placeholder={
            props.lists.length === 0 ? props?.placeholder : undefined
          }
        />
        {props.lists.length > 0 && (
          <label>
            <ul
              // onClick={() => setFocus(true)}
              className='absolute left-[9px] top-[41px] w-[calc(100%-24px)] h-[calc(100%-64px)] pl-6 pr-9 font-inter text-xs leading-[18px] list-disc mr-1 overflow-auto'
            >
              {props.lists.map((list, index) => (
                <li key={list + index}>{list}</li>
              ))}
            </ul>
          </label>
        )}
        {props.limitText && (
          <span className='text-xs font-inter text-[#8A8A8A] tracking-[-0.25px] absolute bottom-2 right-4'>
            {props.limitText}
          </span>
        )}
      </div>
    </>
  );
};

export default ListTextareaV2;
