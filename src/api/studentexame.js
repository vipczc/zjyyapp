import axios from '@/libs/api.request'
import moment from 'moment';


var year = 0

if (moment().month() == 0) {
    year = moment().year() - 1
}else{
    year = moment().year()
}


export const queryStudentexamdata = (type) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querystudentexamdata.do',
        data:{
            stagetype:type
        },
        method: 'post'
    })
}

export const queryStudentexamdataOffice = (id,type,time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querystudentexamdata_office.do',
        data:{
            officeids:id,
            stagetype:type,
            starttime:time == " " ? "":year+"-"+time+"-01 00:00:00",
            endtime:time == " "? "":year+"-"+time+"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 00:00:00",
        },
        method: 'post'
    })
}

export const queryNotpassstudentdata = (id) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querynotpassstudentdata.do',
        data:{
            wtgpersonids:id
        },
        method: 'post'
    })
}
