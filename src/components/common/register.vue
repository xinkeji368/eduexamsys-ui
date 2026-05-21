<!-- 用户注册界面 -->
<template>
  <div id="register">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="top">
          <i class="iconfont icon-kaoshi"></i><span class="title">学生练习考试测试系统</span>
        </div>
        <div class="bottom">
          <div class="container">
            <p class="title">用户注册</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="用户名">
                <el-input v-model.number="formLabelAlign.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" placeholder="请输入密码" type='password'></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="formLabelAlign.confirmPassword" placeholder="请再次输入密码" type='password'></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="formLabelAlign.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formLabelAlign.tel" placeholder="请输入电话号码"></el-input>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-register" @click="register()">注册</el-button>
              </div>
              <div class="options">
                <p class="back"><router-link to="/login">返回登录</router-link></p>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="footer">
      <el-col>
        <p class="msg2">版权所有 ©2023 保留所有权利  <a href="http://beian.miit.gov.cn/" target="_blank">ICP备9527号</a></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        tel: ''
      }
    }
  },
  methods: {
    //用户注册请求后台处理
    register() {
      // 简单的表单验证
      if (!this.formLabelAlign.username) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请输入用户名'
        })
        return
      }
      if (!this.formLabelAlign.password) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请输入密码'
        })
        return
      }
      if (this.formLabelAlign.password !== this.formLabelAlign.confirmPassword) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '两次输入的密码不一致'
        })
        return
      }
      if (!this.formLabelAlign.name) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请输入姓名'
        })
        return
      }
      if (!this.formLabelAlign.email) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请输入邮箱'
        })
        return
      }
      if (!this.formLabelAlign.tel) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请输入电话号码'
        })
        return
      }
      
      // 模拟注册成功
      this.$message({
        showClose: true,
        type: 'success',
        message: '注册成功，请登录'
      })
      
      // 跳转到登录页面
      setTimeout(() => {
        this.$router.push({path: '/login'})
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 32px;
}
.container .el-radio-group {
  margin: 30px 0px;
}
a:link {
  color:#ff962a;
  text-decoration:none;
}
#register {
  font-size: 14px;
  color: #000;
  background-color: #fff;
}
#register .bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background: url('../../../static/img/index.png')center top / cover no-repeat;
  background-color: #b6bccdd1 !important;
}
#register .main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#register .main-container .top {
  margin-top: 100px;
  font-size: 30px;
  color: #ff962a;
  display: flex;
  justify-content: center;
}
#register .top .icon-kaoshi {
  font-size: 80px;
}
#register .top .title {
  margin-top: 20px;
}
#register .bottom {
  display:flex;
  justify-content: center;
  background-color:#fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#register .bottom .title {
  text-align: center;
  font-size: 30px;
}
.bottom .container .title {
  margin: 30px 0px;;
}
.bottom .submit .row-register {
  width: 100%;
  background-color: #04468b;
  border-color: #04468b;
  margin: 20px 0px 10px 0px;
  padding: 15px 20px;
}
.bottom .submit {
  display: flex;
  justify-content: center;
}
.footer {
  margin-top: 50px;
  text-align: center;
}
.footer .msg1 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
}
.footer .msg2 {
  font-size: 14px;
  color: #e3e3e3;
  margin-top: 70px;
}
.bottom .options {
  margin-bottom: 40px;
  color: #ff962a;
  display: flex;
  justify-content: center;
}
.bottom .options > a {
  color: #ff962a;
}
</style>