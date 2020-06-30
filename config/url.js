
import Cookies from 'js-cookie'
let env = process.env.NODE_ENV

// const PRO_URL = 'http://39.104.19.41:8080'
// const TEST_URL = 'http://39.104.19.41:8080'
// const DEV_URL = 'http://39.104.19.41:8080'

const PRO_URL = 'http://' +  Cookies.get('top_url')
const TEST_URL = 'http://' +  Cookies.get('top_url')
const DEV_URL = 'http://' +  Cookies.get('top_url')

console.log('=========',env)

// console.log('---------',process.env)


export default env === 'production' ? PRO_URL : env === 'testing' ? TEST_URL : DEV_URL
