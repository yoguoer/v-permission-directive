import permission from './permission';
import { initHasPermission } from './permission'

// Vue 3 插件定义   
const install = function (app, options = {
  /** permissionList 系统预先配置的权限列表，包含所有权限信息
  *   permissions 用户当前权限列表(服务端返回接口权限列表数据) 
  */
  permissionList: null,
  permissions: null
}) {
  // 添加全局方法 $hasPermissions  
  app.config.globalProperties.$hasPermissions = initHasPermission(options);
  // 注册全局指令 v-permission  
  app.directive('permission', permission);
}

permission.install = install

export default permission

// 用法：
// 检查权限并调用回调函数（如果提供了）  
// hasPermissions({ module: 'someModule', auth: 'someAuth' }, () => {  
//   console.log('用户拥有权限');  
// });  
// 只检查权限，不调用回调函数  
// const hasPermi = hasPermissions({ module: 'someModule', auth: 'someAuth' });  
// console.log(hasPermi); // 输出 true 或 false