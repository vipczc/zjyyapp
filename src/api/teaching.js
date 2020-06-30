import axios from '@/libs/api.request'
import moment from 'moment';

var year = 0

if (moment().month() == 0) {
    year = moment().year() - 1
}else{
    year = moment().year()
}

export const queryMajormanageOffice = (name) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querymajormanageoffice.do',
        data:{
            majorname:name
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

export const queryTeacherTeachingdata = (id,time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteacherteachingdata.do',
        data:{
            datatype:'round',
            starttime:time == " " ? "":year+"-"+time+"-01 00:00:00",
            endtime:time == " "? "":year+"-"+time+"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 00:00:00",
            officeids:id
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

export const queryTeacherTeachingdata1 = (id,time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/queryteacherteachingdata.do?1=1',
        data:{
            datatype:'round',
            starttime:time == " " ? "":year+"-"+time+"-01 00:00:00",
            endtime:time == " "? "":year+"-"+time+"-"+ moment(year + "-" + time,"YYYY-MM").daysInMonth() +" 00:00:00",
            officeids:id
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