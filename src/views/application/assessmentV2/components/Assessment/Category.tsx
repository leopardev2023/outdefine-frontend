import TypographyV2 from "components/Typography/TypographyV2";
import LightBlueButton from "components/V2/Buttons/LightBlueButton";
import IconV2 from "components/V2/Icons";
import InputV2 from "components/V2/Input/InputV2";
import React, { ChangeEvent, useEffect, useState } from "react";
import { setFilterQuery } from "redux/slices/jobs";
import { BusinessIcon, EngineerIcon, ProductIcon } from "../../Icons";
import Title from "../Title";
import CategoryItems from "./CategoryItems";

type Props = {
  assessmentData: any;
  selectedItem: any;
  onSelect: (_: any) => void;
};

const jobIcons = {
  Engineering: <EngineerIcon />,
  "Product & Design": <ProductIcon />,
  Business: <BusinessIcon />,
};

const Category = (props: Props) => {
  const { assessmentData, onSelect, selectedItem } = props;
  const items = ["Engineering", "Product & Design", "Business"];
  const [query, setQuery] = useState("");
  const [engineeringFilteredData, setEngineeringFilteredData] = useState([]);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const filteredData = assessmentData?.Engineering?.filter((item) => {
      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
      return false;
    });

    setEngineeringFilteredData(filteredData);
  }, [query, assessmentData]);

  const searchBoxVisiblity = () => {
    if (activeItem === "Engineering") {
      return true;
    }
    return false;
  };

  const isEngineeringDataEmpty = () => {
    if (!engineeringFilteredData) {
      return true;
    }
    return engineeringFilteredData.length === 0;
  };

  return (
    <>
      <div className="flex gap-x-6">
        {items.map((item, index) => (
          <LightBlueButton
            onClick={() => setActiveItem(item)}
            isActive={item === activeItem}
            icon={jobIcons[item]}
            key={index}
          >
            {item}
          </LightBlueButton>
        ))}
      </div>

      <Title title="Search for a role you would like to be tested in" className="mt-[50px] mb-8" />

      {searchBoxVisiblity() && (
        <InputV2
          name="job_title"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for your role"
          icon={<IconV2 iconType="SEARCH" iconClassName="w-6 h-6 translate-y-[1px]" />}
        />
      )}

      {searchBoxVisiblity() && !isEngineeringDataEmpty() && (
        <Title title="Select testing from options below" className="mt-[50px] mb-8" />
      )}

      {searchBoxVisiblity() && assessmentData && isEngineeringDataEmpty() && (
        <TypographyV2 className="font-inter pt-2 text-error text-xs font-semibold" variant="p3">
          We currently do not have testing for this role. Please select another option.
        </TypographyV2>
      )}

      <CategoryItems
        iconType={activeItem}
        selectedItem={selectedItem?.name}
        onSelect={(item) => {
          onSelect(item);
        }}
        data={
          !assessmentData
            ? []
            : !searchBoxVisiblity()
            ? assessmentData[activeItem]
            : !engineeringFilteredData
            ? []
            : engineeringFilteredData
        }
      />
    </>
  );
};

export default Category;
