import React, { Dispatch, SetStateAction } from 'react';
import { JobType, RoleType } from 'redux/slices/prototype';

import { EngineerIcon, BusinessIcon, ProductIcon } from '../../Icons';
import AccordionItem from './AccordionItem';

const jobIcons = {
  Engineering: <EngineerIcon />,
  'Product & Design': <ProductIcon />,
  Business: <BusinessIcon />,
};

type Props = {
  data: Array<JobType>;
  activeRole: RoleType | undefined;
  setRole: Dispatch<SetStateAction<any>>;
  wrapperClass?: string;
};

const Accordion = (props: Props) => {
  const { data, activeRole, setRole, wrapperClass } = props;

  return (
    <div className={`flex flex-col gap-y-5 ${wrapperClass ?? ''}`}>
      {data?.map((item, _) => (
        <AccordionItem
          icon={jobIcons[item.name]}
          industry={item.name}
          key={item.job_type_id}
          roles={item.roles}
          activeRole={activeRole}
          setActiveRole={(role) => setRole(role)}
        />
      ))}
    </div>
  );
};

export default Accordion;
