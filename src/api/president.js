import axios from '@/libs/api.request'

export const queryProposalsheet = (state,desc) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryproposalsheet.do',
        data:{
            state:state,
            desc:desc,
        },
        method: 'post'
    })
}

export const queryProposalsheetInfo = (id) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryproposalsheetinfo.do',
        data:{
            sheetid:id,
        },
        method: 'post'
    })
}

export const insertProposalsheetinfo = (id,text) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/insertproposalsheetinfo.do',
        data:{
            sheetid:id,
            roletype:3,
            content:text,
            personname:"院长"
        },
        method: 'post'
    })
}

export const updateProposalsheetisinform = (id) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/updateproposalsheetisinform.do',
        data:{
            sheetid:id,
            isinform:1
        },
        method: 'post'
    })
}