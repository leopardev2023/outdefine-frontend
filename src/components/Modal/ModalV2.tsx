import ReactDOM from "react-dom";
// import useWindowDimensions from "hooks/utils/useWindowDimensions";

const ModalV2 = (props: ModalType) => {
  // const { isMobile } = useWindowDimensions();
  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed top-0 left-0 w-full md:left-[210px] md:w-[calc(100%-210PX)] 2xl:left-[290px] 2xl:w-[calc(100%-290px)] h-screen bg-[rgba(0,0,0,0.4)] backdrop-blur-[2px] z-10 overflow-y-auto`}
        onClick={() => props.onClose && props.onClose()}
      >
        {props.children}
      </div>
    </>,
    document.body,
  );
};

interface ModalType {
  isOpen: boolean;
  onClose?: Function;
  children?: any;
}

export default ModalV2;
