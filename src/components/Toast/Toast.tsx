import successIcon from "assets/svg/toasts/success.svg";
import warningIcon from "assets/svg/toasts/warning.svg";
import errorIcon from "assets/svg/toasts/error.svg";
import closeIcon from "assets/svg/toasts/close.svg";
import toast from "react-hot-toast";

const types = {
  success: "toast-bg-success",
  warning: "toast-bg-warning",
  error: "toast-bg-error",
};

const titles = {
  success: "Success",
  warning: "Something went wrong",
  error: "Failed",
};

const images = {
  success: successIcon,
  warning: warningIcon,
  error: errorIcon,
};

const Toast = ({ message, type }) => {
  return (
    <div className={`custom-toast ${types[type] || types.success}`}>
      <img src={images[type] || types.success} alt={titles[type] || titles.success} />
      <div className="ml-[18px]">
        <div className="title">{titles[type] || titles.success}</div>
        <div className="msg">{message}</div>
      </div>
      <img
        src={closeIcon}
        alt="close"
        className="absolute top-0 right-0 m-[10px] cursor-pointer"
        onClick={() => {
          toast.remove();
        }} />
    </div>
  );
};

export default Toast;
