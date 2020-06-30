
export default {
  /**
     * @description token在Cookie中存储的天数，默认1天
     */
  cookieExpires: 1,
  /**
     * @description 是否使用国际化，默认为false
     *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
     *              用来在菜单中显示文字
     */
  useI18n: false,
  // 为小于10的数字添加0
  addZero (data) {
    if (typeof data === 'number') return data < 10 ? '0' + data : data + ''
  },
  // 格式化日期 为小于10日期 拼0
  formatDateStr: function (year, month, day) {
    return year + '-' + this.addZero(month) + ((day && this.addZero) ? '-' : '') + this.addZero(day)
  },
  // 格式化日期 YY-MM-DD HH:MM:SS
  formatTime (times) {
    return (times instanceof Date === true)
      ? times.getFullYear() + '-' + this.addZero(times.getMonth() + 1) + '-' + this.addZero(times.getDate()) + ' ' + this.addZero(times.getHours()) +
             ':' + this.addZero(times.getMinutes()) + ':' + this.addZero(times.getSeconds()) : times
  },
  // 格式化日期 YY-MM-DD
  formatDate (times) {
    return (times instanceof Date === true)
      ? times.getFullYear() + '-' + this.addZero(times.getMonth() + 1) + '-' + this.addZero(times.getDate())
      : times
  },
  /* 生成JSON 对象属性 至少2个  最多4个 */
  // 例如
  // [x, y] = ['name', 'age']
  // arr = [['天涯',26],['天下',22]]
  // 调用方法后的结果 [{name:'天涯'，age:26},{name:'天下'，age:22}]
  generateJSON: ([x, y, z, m], arr) => {
    let ar = []
    arr.map(it => {
      let base = { [x]: it[0], [y]: it[1] }
      let obj = { ...base }
      if (it.length > 2) {
        obj = Object.is(it.length, 3)
          ? { ...base, [z]: it[2] }
          : { ...base, [z]: it[2], [m]: it[3] }
      }
      ar.push(obj)
    })
    return ar
  },
  /* 生成JSON 对象属性 至5个  最多7个  同上 */
  generateJSONMax: ([x, y, z, m, n, f, h], arr) => {
    let ar = []
    arr.map(it => {
      let base = {
        [x]: it[0],
        [y]: it[1],
        [z]: it[2],
        [m]: it[3],
        [n]: it[4]
      }
      let obj = { ...base }
      if (it.length > 5) {
        obj = Object.is(it.length, 6)
          ? { ...base, [f]: it[5] }
          : { ...base, [f]: it[5], [h]: it[6] }
      }
      ar.push(obj)
    })
    return ar
  },
  /* 深拷贝 */
  copy: function (obj1) {
    let obj2 = Array.isArray(obj1) ? [] : {}
    for (let name in obj1) {
      if (obj1[name] != null) {
        if (typeof obj1[name] === 'object') {
          obj2[name] = obj1[name].constructor === Array ? [] : {}
          this.copy(obj1[name], obj2[name])
        } else {
          obj2[name] = obj1[name]
        }
      } else {
        obj2[name] = null
      }
    }
    return obj2 // 然后在把复制好的对象给return出去
  }
}
