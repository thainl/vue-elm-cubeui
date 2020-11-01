import axios from 'axios'
const ERR_OK = 0; // errno 值为 0 则无错误
const baseUrl = process.env.NODE_ENV === 'development' ? '' : 'http://ustbhuangyi.com/sell';

export function getUrl(url) {
  return function(options={}) {
    return axios.get(baseUrl + url, {options})
      .then(res=> {
        const {errno, data} = res.data;
        if(errno === ERR_OK) {
          return data;
        }
      }).catch(err=> {
        throw err
      })
  }
}



// export function getUrl(url) {
//   return function(options) {
//     return fetch(url, options = {})
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           return Promise.reject("请求失败");
//         }
//       })
//       .then(result => {
//         const {errno, data} = result;
//         if(errno === ERR_OK) {
//             return data;
//         }
//       })
//       .catch(err => {
//         throw err;
//       });
//   };
// }
