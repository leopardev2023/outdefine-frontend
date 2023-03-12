import TypographyV2 from "components/Typography/TypographyV2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/hooks/redux-hooks";
import { logOut as lOut } from "redux/slices/authentication";
import PlusSvg from "assets/svg/onboard/plus-button.svg";
import DefaultLogo from "assets/svg/onboard/logo-default-case.svg";
import Button from "components/Button/ButtonV2";

const ExistingCompanyComponent = ({ cancelSelection, companyLists, joinCompany }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleBack = async () => {
    await dispatch(lOut());
    navigate("/");
  };

  return (
    <div>
      <TypographyV2 variant="subtitle2" className="font-poppins text-base text-[20px]" semibold>
        There is an existing company linked to this email domain outdefine.com. Please select a card
        below to join their team.
      </TypographyV2>

      <TypographyV2
        variant="subtitle2"
        className="font-poppins text-base text-[16px] mt-[35px]"
        semibold
      >
        Organizations
      </TypographyV2>

      {companyLists?.map((item) => (
        <div
          className="flex flex-row bg-white py-[10px] px-[19px] mt-3 items-center w-[379px]"
          key={item.company_id}
        >
          <img src={item.logo ?? DefaultLogo} alt="company logo" width={42} />
          <div className="flex flex-col grow px-[10px] ml-1">
            <TypographyV2
              variant="subtitle2"
              className="font-poppins text-base text-[16px] font-extrabold"
              semibold
            >
              {item.name}
            </TypographyV2>
            <TypographyV2
              variant="subtitle2"
              className="font-poppins text-base text-[12px] font-semibold"
              semibold
            >
              {item.website}
            </TypographyV2>
          </div>
          <Button
            type="submit"
            className="border border-odf font-poppins font-bold text-p2 md:text-sm h-[40px] pt-[9px] w-[106px] px-[10px] ml-4"
            loading={isLoading}
            onClick={() => {
              joinCompany(item);
            }}
          >
            Join now
          </Button>
        </div>
      ))}

      <TypographyV2
        variant="subtitle2"
        className="font-poppins text-base text-[14px] mt-[30px]"
        semibold
      >
        Not your team?
      </TypographyV2>

      <TypographyV2
        variant="subtitle2"
        className="font-poppins text-base text-[12px] mt-[0px]"
        semibold
      >
        Create a new organization for your company.
      </TypographyV2>

      <div
        className="w-[379px] h-[97px] border border-dotted	border-[#A9ACB1] rounded-md flex items-center justify-center cursor-pointer"
        onClick={() => {
          cancelSelection();
        }}
      >
        <TypographyV2
          variant="subtitle2"
          className="font-poppins text-base text-[14px] text-[#8A8A8A]"
          semibold
        >
          New organization
        </TypographyV2>
        <img src={PlusSvg} className={"ml-[15px]"} />
      </div>

      <Button
        type="button"
        onClick={handleBack}
        className="font-poppins font-bold text-p2 md:text-sm text-black sm:max-md:w-[40vw] h-[40px] mt-4 pt-[9px]"
        variant="secondary"
        loading={false}
      >
        Back
      </Button>
    </div>
  );
};

export default ExistingCompanyComponent;
