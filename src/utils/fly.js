import Fly from "flyio/dist/npm/wx";

const fly = new Fly;

//配置请求基地址
fly.config.baseURL = "http://cdzj.demo.com/Apiapi" // "https://www.cdxscn.com/Apiapi"

//添加请求拦截器
fly.interceptors.request.use((config, promise) => {
    //给所有请求添加自定义header
    config.headers["content-type"] = "application/x-www-form-urlencoded";
    //可以通过promise.reject／resolve直接中止请求
    //promise.resolve("fake data")
    return config;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response, promise) => {
        //只将请求结果的data字段返回
        
        return response.data
    },
    (err, promise) => {
        //发生网络错误后会走到这里
        //promise.resolve("ssss")
    }
)
export default fly
