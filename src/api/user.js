import axios from '@/libs/api.request'

export const login = (id,pass) => {
  return axios.request({
    url: '/doctor_portal/rest/preLoginCheck.do',
    data:{
      loginid:id,
      password:pass,
      iphonetype:"h5"
    },
    method: 'post'
  })
}

export const trainHospital = () => {
  return axios.request({
    url: 'http://www.jiuhuatech.com:6023/cloud_doctor_train/rest/trainHospital/query.do',
    method: 'post'
  })
}
