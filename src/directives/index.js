// 图片错误指令
export const imgerror = {
  // 标签插入到dom时执行
  inserted(el) {
    // 图片出错时触发
    el.onerror = () => {
      el.src = require('@/assets/common/22.png')
    }
  }
  // 数据更新时执行
  // update(el) {
  //   el.src = require('@/assets/common/22.png')
  // }
}
