import Vue from 'vue'
import { Button, Table, Modal, Form, Select, Input, Radio, Checkbox, message, Popconfirm } from 'ant-design-vue'
Vue.use(Button)
Vue.use(Table)
Vue.use(Modal)
Vue.use(Form)
Vue.use(Select)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Popconfirm)
Vue.use(message)
Vue.prototype.$message = message
message.config({
  duration: 2, // 持续时间
  top: '100px', // 到页面顶部距离
  maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭
})
