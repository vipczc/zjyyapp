import axios from '@/libs/api.request'

export const querySkillcenTredetailsdata = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryskillcentredetailsdata.do',
        method: 'post'
    })
}

export const queryActivitydata = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryactivitydata.do',
        method: 'post'
    })
}

export const querySkillCentredata = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryskillcentredata.do',
        method: 'post'
    })
}