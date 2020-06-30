import axios from '@/libs/api.request'
import moment from 'moment';

var year = 0

if (moment().month() == 0) {
    year = moment().year()
}else{
    year = moment().year()
}

export const teachereValuate = (type,start,end) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteacherevaluate.do',
        data:{
            timerange:type
        },
        method: 'post'
    })
}

export const workToday = (desctype,type) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryworktoday.do',
        data:{
            desc:desctype,
            traintype:type == 0 ? "":type,
            state:""
        },  
        method: 'post'
    })
}

export const teacherData = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteacherdata.do',
        method: 'post'
    })
}

export const teacherWorkload = (time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteacherworkload.do',
        data:{
            starttime:year + "-"+time+"-01 00:00:00",
            endtime:year + "-"+time+"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 23:59:59"
        },
        method: 'post'
    })
}

export const teacherStrainingdata = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteacherstrainingdata.do',
        data:{
            year:year,
            // token:1648798535254016200
        },  
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        method: 'post'
    })
}
//学生评价
export const queryStudenteValuate = (time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querystudentevaluate.do',
        data:{
            starttime:year + "-"+ time +"-01 00:00:00",
            endtime:year + "-"+ time +"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 23:59:59",
        },
        method: 'post'
    })
}
//学生轮转
export const queryHomepageRounddata = (time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryhomepagerounddata.do',
        data:{
            starttime:year + "-"+ time +"-01 00:00:00",
            endtime:year + "-"+ time +"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 23:59:59",
        },
        method: 'post'
    })
}
//学生培训
export const queryHomepageTraindata = (time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryhomepagetraindata.do',
        data:{
            starttime:year + "-"+ time +"-01 00:00:00",
            endtime:year + "-"+ time +"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 23:59:59",
        },
        method: 'post'
    })
}

export const queryHomepageExamdata = (start,end) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryhomepageexamdata.do',
        data:{
            starttime:year + "-"+ start +"-01 00:00:00",
            endtime:year + "-"+ end +"-"+ moment(year + "-" + end,"YYYY-MM").daysInMonth() +" 23:59:59"
        },
        method: 'post'
    })
}

export const queryHomepageStudentdata = (time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryhomepagestudentdata.do',
        data:{
            starttime:year + "-"+ time +"-01 00:00:00",
            endtime:year + "-"+ time +"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 23:59:59",
        },
        method: 'post'
    })
}

export const queryProposalsheetdata = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryproposalsheetdata.do?1=1',
        data:{
            type:1
        },
        method: 'post'
    })
}

export const queryProposalsheetdata2 = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryproposalsheetdata.do?2=2',
        data:{
            type:2
        },
        method: 'post'
    })
}