import axios from "axios";
import { NODE_ENV } from "./env";
const env = NODE_ENV || "development";

axios.defaults.baseURL =
  env === "development"
    ? `https://dr552jpkj7.execute-api.us-west-1.amazonaws.com/dev/outdefine`
    : "/api";

export default axios;
