import axios from '@/libs/api.request'
import moment from 'moment';

var year = 0

if (moment().month() == 0) {
    year = moment().year()
}else{
    year = moment().year()
}

export const queryTeachereValuationitem = (time,datas) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteacherevaluationitem.do',
        data:{
            starttime:year+"-"+ time +"-01 00:00:00",
            endtime:year+"-"+ time +"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 23:59:59",
            // starttime: "2019-12-01 00:00:00",
            // endtime: "2019-12-31 23:59:59"
            officeid:datas
        },
        method: 'post'
    })
}

export const queryTeachereValuationitemNew = (top,end) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteacherevaluationitem_new.do',
        data:{
            evaluationid:top,
            evaluationitemid:end
        },
        method: 'post'
    })
}

export const queryMajorFavorablerate = (time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querymajorfavorablerate.do',
        data:{
            starttime:year+"-"+time +"-01 00:00:00",
            endtime:year+"-"+time +"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 23:59:59",
            // starttime: "2019-12-01 00:00:00",
            // endtime: "2019-12-31 23:59:59"
        },
        method: 'post'
    })
}

export const queryMajorTeacherevaluatedata = (id,time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querymajorteacherevaluatedata.do',
        data:{
            majorsubjectid:id,
            // starttime: "2019-12-01 00:00:00",
            // endtime: "2019-12-31 23:59:59"
            starttime:year+"-"+time +"-01 00:00:00",
            endtime:year+"-"+time +"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 23:59:59",
        },
        method: 'post'
    })
}

export const queryMajorTeacherevaluatedataitem = (ids,id,time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querymajorteacherevaluatedataitem.do',
        data:{
            personid:ids,   
            officeids:id,
            starttime:year+"-"+time +"-01 00:00:00",
            endtime:year+"-"+time +"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 23:59:59",
            // starttime: "2019-12-01 00:00:00",
            // endtime: "2019-12-31 23:59:59"
        },
        method: 'post'
    })
}


export const getoffice = () => {             //筛选科室
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryoffice.do',
        // data: {
        //     officeid: ids
        // },
        method: 'post'
    })
}