import { ReactElement } from 'react';

export default function MarkDown({ open }: { open: boolean }): ReactElement {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${open ? 'rotate-180' : ''} transition-all duration-200`}
    >
      <path
        d='M13.1263 6.45962C13.3802 6.20578 13.3802 5.79422 13.1263 5.54038C12.8725 5.28654 12.4609 5.28654 12.2071 5.54038L13.1263 6.45962ZM8.00004 10.6667L7.54042 11.1263C7.66232 11.2482 7.82765 11.3167 8.00004 11.3167C8.17243 11.3167 8.33776 11.2482 8.45966 11.1263L8.00004 10.6667ZM3.79299 5.54038C3.53915 5.28654 3.1276 5.28654 2.87375 5.54038C2.61991 5.79422 2.61991 6.20578 2.87375 6.45962L3.79299 5.54038ZM12.2071 5.54038L7.54042 10.207L8.45966 11.1263L13.1263 6.45962L12.2071 5.54038ZM8.45966 10.207L3.79299 5.54038L2.87375 6.45962L7.54042 11.1263L8.45966 10.207Z'
        fill={open ? '#161719' : '#A9ACB1'}
      />
    </svg>
  );
}
