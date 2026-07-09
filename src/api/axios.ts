import axios from "axios";

import { getApiDomain } from "@/helpers/api.helper";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.baseURL = getApiDomain();
  return config;
});

export default instance;
