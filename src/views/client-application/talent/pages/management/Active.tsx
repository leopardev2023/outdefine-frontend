import { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "redux/hooks/redux-hooks";

import DropdownV2 from "components/V2/Dropdown/DropdownV2";
import robotNewTalentImg from "assets/img/application/robotNewTalent.png";
import Button from "components/Button/ButtonV2";
import bgBikeImg from "assets/img/application/bgBike.png";
import ContractCard from "../../components/Card.Contract";
import ModalV2 from "components/Modal/ModalV2";
import closeSVG from "assets/svg/assessment/close.svg";
import NameRoleLocation from "../../components/Group.NameRoleLocation";
import TextareaV2 from "components/V2/Textarea/TextareaV2";
import magicStarSVG from "assets/svg/talent/magicStar.svg";
import defaultAvatar from "assets/svg/application/Joe2.svg";
import UpdateTalent from "./item/UpdateTalent";
import TalentSkeleton from "../../components/Talent.Skeleton";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";

const data = [
  { value: "Bad", id: 1 },
  { value: "Good", id: 2 },
  { value: "Excellent", id: 3 },
];

type ActiveProps = {
  loading: boolean;
  onRefetch: () => void;
};

const Active = ({ loading, onRefetch }: ActiveProps) => {
  const actives = useAppSelector((state) => state.application.actives);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [textAreaData, setTextAreaData] = useState<string>("");
  const [selectedID, setSelectedID] = useState<number | undefined>(0);
  const [selectedItem, setSelectedItem] = useState<any>({});

  if (loading)
    return (
      <div className="mt-[72px]">
        <TalentSkeleton />
      </div>
    );

  return (
    <>
      {actives?.length === 0 && (
        <EmptyPanelV2
          image="/app/common/spaceboy/astro-cook.png"
          imageClassName="w-[152px] h-[158px]"
          description="Start finding talent and create your dream team!"
          title="No talent"
          className="h-[440px] pt-[72px] mt-[126px]"
        >
          <NavLink to="/talent" className="block mt-6">
            <Button>Find talent</Button>
          </NavLink>
        </EmptyPanelV2>
      )}
      {actives?.length > 0 && (
        <div className="mt-[72px] flex flex-col justify-center gap-y-14 items-center bg-background">
          <div className="flex justify-start items-center w-full bg-orange-hue-1 py-2 gap-x-10 rounded-md">
            <div className="w-[172px] h-[104px] relative shrink-0  pl-4">
              <img alt="bgBikeImg" src={bgBikeImg} className="w-[170px] h-[104px] absolute" />
              <img
                alt="robotNewTalentImg"
                src={robotNewTalentImg}
                className="w-[125px] h-[125px] absolute left-[50%] -translate-x-[30%] bottom-[-7px]"
              />
            </div>
            <div className="flex flex-col gap-y-2 pr-36">
              <span className="font-poppins font-bold text-xl">
                Manage and keep track of your talent.
              </span>
              <span className="text-xs font-inter font-bold">
                Manage talent and update contract details.
              </span>
            </div>
          </div>
          {actives?.length > 0 &&
            actives?.map((item, index) => (
              <ContractCard
                setCreateModal={(enabled: boolean) => {
                  setCreateModal(enabled);
                }}
                setUpdateModal={(enabled: boolean) => {
                  setUpdateModal(enabled);
                }}
                setSelectedItem={(enabled: any) => {
                  setSelectedItem(enabled);
                }}
                item={item}
                key={index}
              />
            ))}
        </div>
      )}
      <ModalV2 isOpen={createModal}>
        <div className="absolute top-[150px] left-1/2 -translate-x-1/2 z-10 pb-20">
          <div className="flex flex-col items-center bg-white w-[720px] rounded-[15px]">
            <div className="">
              <button className="absolute right-6 top-6" onClick={() => setCreateModal(false)}>
                <img src={closeSVG} alt="" />
              </button>
              <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">
                Review talent
              </h2>
            </div>
            <form className="w-full mt-7 pr-11 pl-16 flex items-start justify-start flex-col">
              <div className="flex gap-5">
                <img alt="experience" src={defaultAvatar} className="w-12 h-12" />
                <div className="flex flex-col gap-4">
                  <NameRoleLocation name={"Alexis Tanaka"} role={"Product Designer"} />
                </div>
              </div>
              <span className="mt-5 text-xs">Tell us about your experience</span>
              <div className="w-full pt-3 h-[134px] text-xs">
                <TextareaV2
                  value={textAreaData}
                  placeholder="Tell us about your experience."
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setTextAreaData(e.target.value)
                  }
                />
              </div>
              <span className="mt-5 mb-4 text-xs">Rating</span>
              <DropdownV2
                icon={<img alt="magicStarSVG" src={magicStarSVG} className="w-6 h-6" />}
                placeholder="Choose a rating"
                data={data}
                selectedIndex={selectedID}
                onChange={(idx: number) => setSelectedID(idx)}
              />
            </form>
            <div className="mb-5 mt-9">
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  setCreateModal(false);
                }}
              >
                Create review
              </Button>
            </div>
          </div>
        </div>
      </ModalV2>
      <ModalV2 isOpen={updateModal}>
        <UpdateTalent
          setUpdateModal={(enabled: boolean) => {
            setUpdateModal(enabled);
          }}
          selectedItem={selectedItem}
          onRefetch={onRefetch}
        />
      </ModalV2>
    </>
  );
};
export default Active;
