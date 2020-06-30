import axios from '@/libs/api.request'

export const querytrainOfTeacherdata = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querytrainofteacherdata.do?1=1',
        data:{
            type:1
        },
        method: 'post'
    })
}

export const querytrainOfTeacherdata2 = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querytrainofteacherdata.do?2=2',
        data:{
            type:2
        },
        method: 'post'
    })
}

export const querytrainOfTeacherdata3 = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querytrainofteacherdata.do?3=3',
        data:{
            type:3
        },
        method: 'post'
    })
}
