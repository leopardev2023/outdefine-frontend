import * as React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (<ColorRing
        visible={true}
        height='120'
        width='120'
        wrapperClass="w-full flex flex-row justify-center items-center"
        ariaLabel='blocks-loading'
        colors={["#FF8134", "#FF5757", "#5F5FFF", "#2F3454", "transparent"]}
    />);
};

export default Loader;
