import LightBlueButton from "components/V2/Buttons/LightBlueButton";
import React from "react";
import { BusinessIcon, EngineerIcon, ProductIcon } from "../../Icons";

type Props = {
  iconType: string;
  selectedItem: string;
  onSelect: (_: any) => void;
  data: any;
};

const jobIcons = {
  Engineering: <EngineerIcon />,
  "Product & Design": <ProductIcon />,
  Business: <BusinessIcon />,
};

const CategoryItems = (props: Props) => {
  const { iconType, selectedItem, data, onSelect } = props;

  return (
    <div className="flex gap-x-6 flex-col" data-cy="category-item">
      {data?.map((item) => (
        <LightBlueButton
          onClick={() => onSelect(item)}
          isActive={item.name === selectedItem}
          icon={jobIcons[iconType]}
          key={item.id}
        >
          {item.name}
        </LightBlueButton>
      ))}
    </div>
  );
};

export default CategoryItems;
