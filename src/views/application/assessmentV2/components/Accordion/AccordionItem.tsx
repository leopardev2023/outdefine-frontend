import React, { useMemo, useState } from 'react';
import { RoleType } from 'redux/slices/prototype';

type Props = {
  icon?: any;
  industry?: string;
  roles?: Array<RoleType>;
  activeRole: RoleType | undefined;
  setActiveRole: (role: RoleType) => void;
};

const Card = ({ children }) => {
  return (
    <div className='bg-white rounded-[8px] shadow-md px-2 py-8 h-fit'>
      <div className='max-h-[150px] overflow-auto'>{children}</div>
    </div>
  );
};

const ListItem = ({ onClick, children }) => {
  return (
    <div
      className='w-full text-sm font-inter font-regular rounded-[8px] px-2 py-4 bg-white hover:bg-odf-light cursor-pointer'
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const AccordionItem = (props: Props) => {
  const { icon, industry, roles, activeRole, setActiveRole } = props;
  const [opened, setOpened] = useState<boolean>(false);
  const [selected, setSelected] = useState<RoleType>();
  const isActive = useMemo(
    () => activeRole && selected && activeRole?.role_id === selected?.role_id,
    [activeRole, selected]
  );

  return (
    <div>
      <div
        className={`flex w-full rounded-[8px] border border-white text-sm font-inter pl-4 py-3 items-center gap-x-6 mb-[14px] cursor-pointer transition-all duration-800 ${
          opened || isActive ? 'bg-odf-light !border-theme ' : 'bg-white'
        }`}
        onClick={() => setOpened(!opened)}
      >
        {icon}
        <span>{industry}</span>
      </div>
      {opened && (
        <Card>
          {roles?.map((item: RoleType, index: number) => (
            <ListItem
              onClick={() => {
                setSelected(item);
                setActiveRole(item);
                setOpened(!opened);
              }}
              key={index}
            >
              {item.name}
            </ListItem>
          ))}
        </Card>
      )}
      {activeRole && selected && !opened && isActive && (
        <div className='w-fit rounded-[8px] mt-3 bg-odf-light border border-theme px-4 py-3 text-sm font-inter'>
          {activeRole.name}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
