import axios from "axios";

import { DOMAIN } from "@/helpers/api.helper";

axios.defaults.baseURL = DOMAIN;

export default axios;
