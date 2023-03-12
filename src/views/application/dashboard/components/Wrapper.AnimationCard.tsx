import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

const AnimationCard = ({
  index,
  children,
}: {
  children: any;
  index: number;
}) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100 * index);
  }, []);

  return (
    <Transition
      show={show}
      enter='transform transition duration-100'
      enterFrom='opacity-0 scale-75'
      enterTo='opacity-100 scale-100'
      leave='transition-opacity duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      {children}
    </Transition>
  );
};

export default AnimationCard;
