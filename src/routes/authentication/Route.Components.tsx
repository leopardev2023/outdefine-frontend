import Icon from 'components/Icon';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import IndexPage from 'views/temp';
import BadgeComponents from 'views/temp/badge';
import ButtonComponents from 'views/temp/buttons';
import CheckBoxComponents from 'views/temp/checkbox';
import DropdownComponents from 'views/temp/dropdown';
import InputComponents from 'views/temp/input';
import InputDropdownComponent from 'views/temp/inputdropdown';
import MultiOptionDropdownComponent from 'views/temp/multioptiondropdown';
import RadioComponents from 'views/temp/radio';
import SwitchComponents from 'views/temp/switch';
import TabComponents from 'views/temp/tab';
import TextareaComponents from 'views/temp/textarea';
import TypographyComponents from 'views/temp/typography';

const routes = [
  {
    path: '/',
    exact: true,
    element: <IndexPage />,
  },
  {
    path: '/button',
    element: <ButtonComponents />,
  },
  {
    path: '/typography',
    element: <TypographyComponents />,
  },
  {
    path: '/radio',
    element: <RadioComponents />,
  },
  {
    path: '/checkbox',
    element: <CheckBoxComponents />,
  },
  {
    path: '/switch',
    element: <SwitchComponents />,
  },
  {
    path: '/input',
    element: <InputComponents />,
  },
  {
    path: '/badge',
    element: <BadgeComponents />,
  },
  {
    path: '/dropdown',
    element: <DropdownComponents />,
  },
  {
    path: '/textarea',
    element: <TextareaComponents />,
  },
  {
    path: '/tab',
    element: <TabComponents />,
  },
  {
    path: '/multioptiondropdown',
    element: <MultiOptionDropdownComponent />,
  },
  {
    path: '/inputdropdown',
    element: <InputDropdownComponent />,
  },
];

const ComponentRoutes: React.FC = () => {
  return (
    <div className='mt-16 px-20'>
      <div className='mt-10 mb-20'>
        <NavLink
          className='rounded-lg bg-odf hover:bg-odf/50 text-white hover:text-odf transition-all duration-150 px-10 py-4'
          to='/components'
        >
          Back
        </NavLink>
      </div>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </div>
  );
};

export default ComponentRoutes;
