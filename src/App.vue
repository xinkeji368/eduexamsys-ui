<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Microsoft YaHei", "Helvetica", "Tahoma", "Geneva", "Arial", sans-serif;
  background-color: #f0f2f5;
  color: #303133;
}
/* 内容区域样式 */
.el-main {
  background-color: #fff;
  padding: 20px;
  min-height: calc(100vh - 80px);
}
/* 表格样式 */
.el-table {
  margin-top: 20px;
}
/* 按钮样式 */
.el-button--primary {
  background-color: #1890ff;
  border-color: #1890ff;
}
/* 表单样式 */
.el-form {
  margin-top: 20px;
}
</style>
