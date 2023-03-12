import { useState } from "react";

import IconButtonV2 from "components/V2/IconButton/IconButtonV2";
import TalentInfoView from "./TalentInfoView";

export default function TalentCardV2({ talent, children, menu }: ITalentCardV2) {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);

  return (
    <div className="w-full rounded-lg bg-white pt-5 pb-4 px-4 flex justify-between flex-wrap gap-y-4 items-end shadow-card relative">
      <TalentInfoView talent={talent} />

      {menu && (
        <IconButtonV2
          onClick={() => setMenuVisibility(!menuVisibility)}
          iconType="TRIPLE-DOT"
          className="p-0 w-[38px] h-[18px] top-4 right-7 absolute"
        />
      )}

      {menuVisibility && menu && (
        <div className="dropdown list-none p-0 m-0 absolute right-[-173px] top-12 rounded-md w-[198px] pt-4 px-4 shadow-xl bg-white z-30">
          <ul className="pb-4">
            {menu.texts.map((menuText, index) => (
              <li
                key={"menu" + index}
                className="text-xs px-3 py-5 hover:bg-odf-light hover:cursor-pointer rounded-md flex gap-x-3 items-center"
                onClick={() => {
                  setMenuVisibility(false);
                  menu.actions[index]();
                }}
              >
                {menuText}
              </li>
            ))}
          </ul>
        </div>
      )}

      {children}
    </div>
  );
}
