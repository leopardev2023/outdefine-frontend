import { DASHBOARD } from "constants/sidebar";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import NavIconV2 from "./IconsV2";

interface DataProps {
  link: string;
  text: string;
  dotIcon?: boolean;
  data?: Array<any>;
  addClass?: string;
  customeIcon?: JSX.Element;
  onClick?: Function;
}

const ItemV2 = (props: DataProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const path = useLocation().pathname;
  const sub_active =
    path?.split("/")[1] === props?.link?.slice(1, props?.link?.length) ||
    (props?.link?.slice(1, props?.link?.length) === DASHBOARD && path === "/") ||
    path === props.link;
  const exceptions = [undefined, "post", "edit"];
  const active = !props.data ? sub_active : sub_active && exceptions.includes(path.split("/")[2]);

  return (
    <div>
      <NavLink
        data-cy={"sidebar-link-" + props.text.toLocaleLowerCase()}
        onClick={() => {
          props.onClick && props.onClick(true);
        }}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        key={props.link}
        to={props.link}
        className={`group capitalize font-poppins flex items-center gap-[28px] h-11 px-3 transition-all duration-150 hover:bg-odf rounded-lg ${
          props.addClass ?? ""
        } ${active ? "bg-odf" : ""}`}
      >
        <NavIconV2
          dotIcon={props.dotIcon}
          customeItem={props.customeIcon}
          active={active}
          groupActive={hover}
          item={props.text.toLocaleLowerCase()}
        />

        <span
          className={`hidden md:block ${
            active ? "text-white" : "text-[#201000]"
          } group-hover:text-white ${
            props.dotIcon
              ? "text-xs font-inter leading-[18px] font-semibold"
              : "font-semibold text-sm"
          } transition-all duration-150`}
        >
          {props.text}
        </span>
      </NavLink>
      {sub_active && props.data && props.data?.length > 0 && (
        <ul className="flex flex-col gap-2">
          {props.data.map((sublink, index) => (
            <li
              key={props.text + "sub" + index}
              className={`group cursor-pointer text-xs font-inter items-center flex last-of-type:-mb-6 first-of-type:mt-[6px] hover:bg-odf text-[#201000] hover:text-white rounded-lg transition-all duration-150 ${
                path.split("/")[2] === sublink.link.toLowerCase()
                  ? "bg-odf text-white"
                  : "text-[#201000]"
              }`}
            >
              <NavLink
                to={props.link + "/" + sublink.link}
                className={`flex pl-6 h-11 w-full items-center gap-5 2xl:gap-8 group-hover:text-white ${
                  path.split("/")[2] === sublink.link.toLowerCase()
                    ? "text-white"
                    : "text-[#201000]"
                }`}
              >
                <span
                  className={`w-2 h-2 ${
                    path.split("/")[2] === sublink.link.toLowerCase() ? "bg-white" : "bg-odf"
                  } group-hover:bg-white rounded-full`}
                />
                {sublink.text}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemV2;
