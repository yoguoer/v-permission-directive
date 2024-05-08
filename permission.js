/**
* 权限指令
* 使用： v-permission="{module:'模块名称',auth:'权限key值'}"
*/

/**  
 * 初始化全局权限判断方法  
 * @param {object} options - 权限对象，包含 {permissionList, permissions}  
 * @returns {function} - 返回一个函数，该函数接收一个权限对象并返回是否有权限  
 */
export function initHasPermission(options) {
  /** permissionList 系统预先配置的权限列表，包含所有权限信息
  *   permissions 用户当前权限列表(服务端返回接口权限列表数据) 
  */
  const { permissionList = null, permissions = null } = options;
  // 返回一个函数，该函数接收一个权限对象并返回是否有权限 
  return (permission, callback) => {
    if (!permissionList || !permissions) {
      throw new Error('permissionList or permissions is null');
    }

    if (permission.module && permission.auth) {
      const value = permissionList[permission.module][permission.auth];
      const haspermiss = permissions.includes(value)
      if (haspermiss && typeof callback === 'function') {
        callback();
      }
      return haspermiss;
    }
    return false;
  };
}

// 检查权限并执行相应的操作  
function checkPermission(el, binding) {
  if (!hasPermissions(binding.value)) {
    el.style.display = 'none';
  } else {
    el.style.display = ''; // 如果有权限，确保元素可见  
  }
}

// 权限指令  
export default {
  mounted(el, binding) {
    checkPermission(el, binding);
  },
  updated(el, binding) {
    checkPermission(el, binding);
  }
};  




