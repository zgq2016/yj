import axios from "axios";
import {url} from "@/api/configuration"
// 统一图片文件上传接口
export const Api = (data) => {
  return axios({
    url: `${url}/uploadpic.php`,
    method: "post",
    data: data,
  });
};
