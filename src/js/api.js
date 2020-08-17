import axios from "axios";
// 统一图片文件上传接口
export const Api = data => {
  return axios({
    url: "https://shesho.ppp-pay.top/uploadpic.php",
    method: "post",
    data: data
  });
};
