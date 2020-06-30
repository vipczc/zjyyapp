import axios from '@/libs/api.request'

export const queryTeacherTitledistribution = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteachertitledistribution.do',
        method: 'post'
    })
}

export const queryTeacheTeachingsum = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteacheteachingsum.do',
        method: 'post'
    })
}

export const queryTrainOfteacherdata4 = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querytrainofteacherdata.do?4=4',
        data:{
            type:4
        },
        method: 'post'
    })
}