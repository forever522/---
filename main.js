import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

// 配置请求基础路径

//const baseUrl = 'http://localhost'
const baseUrl = 'https://api.forhe.top'
// 由于部署在了服务器，所以就使用的服务端
// 拦截器
uni.addInterceptor('request', {
  invoke(args) {
    args.url = baseUrl + args.url
    // 获取存储的token
    const token = uni.getStorageSync('token')
    // 设置header
    args.header = {
      ...args.header,
      'content-type': 'application/json',
      'token': token  // 直接在header中设置token
    }
  },
  success(args) {
    // 处理响应数据
    if (args.data.code === -1) { // 假设code为-1表示未登录或token过期
      // 清除本地token
      uni.removeStorageSync('token')
      // 跳转到登录页
      uni.navigateTo({
        url: '/pages/login/login'
      })
    }
    return args
  },
  fail(err) {
    console.error('请求失败：', err)
    uni.showToast({
      title: '网络请求失败',
      icon: 'none'
    })
    return err
  }
})

// 添加上传文件拦截器
uni.addInterceptor('uploadFile', {
  invoke(args) {
    args.url = baseUrl + args.url
    // 获取存储的token
    const token = uni.getStorageSync('token')
    // 设置header
    args.header = {
      ...args.header,
      'token': token
    }
  },
  success(args) {
    return args
  },
  fail(err) {
    console.error('上传失败：', err)
    uni.showToast({
      title: '上传文件失败',
      icon: 'none'
    })
    return err
  }
})