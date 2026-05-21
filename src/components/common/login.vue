<!-- 用户登录界面 -->
<template>
  <div id="login">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="top">
          <i class="iconfont icon-kaoshi"></i><span class="title">学生练习考试测试系统</span>
        </div>
        <div class="bottom">
          <div class="container">
            <p class="title">用户登录</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="用户名">
                <el-input v-model.number="formLabelAlign.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" placeholder="请输入密码" type='password'></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="rememberMe">记住我</el-checkbox>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-login" @click="login()">登录</el-button>
              </div>
              <div class="options">
                <p class="find"><a href="javascript:;">找回密码</a></p>
                <div class="register">
                  <span>没有账号?</span>
                  <span><router-link to="/register">去注册</router-link></span>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="footer">
      <el-col>
        <p class="msg2">版权所有 ©2023 <!--2023计算机科学与技术2班张尧--> 保留所有权利  <a href="http://beian.miit.gov.cn/" target="_blank">ICP备9527号</a></p>
      </el-col>


    </el-row>
  </div>
</template>

<script>
import store from '@/vuex/store'
import {mapState} from 'vuex'
export default {
  store,
  name: "login",
  data() {
    return {
      role: 2,
      labelPosition: 'left',
      formLabelAlign: {
        username: '',
        password: ''
      },
      rememberMe: false
    }
  },
  methods: {
    //用户登录请求后台处理
    login() {
      console.log("登录操作执行-------");
      this.$axios({
        url: `/api/login`,
        method: 'post',
        data: {
          ...this.formLabelAlign
        }
      }).then(res=>{
        let resData = res.data.data
        if(resData != null) {
          // 记住我功能
          if(this.rememberMe) {
            localStorage.setItem('username', this.formLabelAlign.username)
            localStorage.setItem('password', this.formLabelAlign.password)
            localStorage.setItem('rememberMe', 'true')
          } else {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            localStorage.removeItem('rememberMe')
          }
          
          switch(resData.role) {
            case "0":  //管理员
              this.$cookies.set("cname", resData.adminName)
              this.$cookies.set("cid", resData.adminId)
              this.$cookies.set("role", 0)
              this.$router.push({path: '/index' }) //跳转到首页
              break
            case "1": //教师
              this.$cookies.set("cname", resData.teacherName)
              this.$cookies.set("cid", resData.teacherId)
              this.$cookies.set("role", 1)
              this.$router.push({path: '/index' }) //跳转到教师用户
              break
            case "2": //学生
              this.$cookies.set("cname", resData.studentName)
              this.$cookies.set("cid", resData.studentId)
              this.$router.push({path: '/student'})
              break
          }
        }
        if(resData == null) { //错误提示
          this.$message({
            showClose: true,
            type: 'error',
            message: '用户名或者密码错误'
          })
        }
      })
    },
    clickTag(key) {
      this.role = key
    }
  },
  computed: mapState(["userInfo"]),
  mounted() {
    // 检查本地存储中是否有保存的登录信息
    if(localStorage.getItem('rememberMe') === 'true') {
      this.formLabelAlign.username = localStorage.getItem('username') || ''
      this.formLabelAlign.password = localStorage.getItem('password') || ''
      this.rememberMe = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.remind {
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  position: fixed;
  right: var(--spacing-lg);
  bottom: 50%;
  flex-direction: column;
  color: var(--text-color-secondary);
  background-color: var(--bg-color);
  border-left: 4px solid var(--primary-color);
  box-shadow: var(--shadow-medium);
}

.container {
  margin-bottom: var(--spacing-xl);

  .el-radio-group {
    margin: var(--spacing-lg) 0;
  }
}

a:link {
  color: var(--warning-color);
  text-decoration: none;
}

#login {
  font-size: 14px;
  color: var(--text-color);
  background-color: var(--bg-color);

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-color: rgba(182, 188, 221, 0.82) !important;
  }

  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .main-container .top {
    margin-top: var(--spacing-xl);
    font-size: 30px;
    color: var(--warning-color);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top .icon-kaoshi {
    font-size: 80px;
    color: var(--primary-color);
  }

  .top .title {
    margin-top: var(--spacing-md);
    font-weight: 600;
  }

  .bottom {
    display: flex;
    justify-content: center;
    background-color: var(--bg-color);
    border-radius: var(--border-radius-large);
    box-shadow: var(--shadow-heavy);
    padding: var(--spacing-xl);
    transition: transform 0.3s var(--transition-function);

    &:hover {
      transform: translateY(-4px);
    }

    .title {
      text-align: center;
      font-size: 28px;
      font-weight: 600;
      color: var(--text-color);
      margin-bottom: var(--spacing-lg);
    }
  }

  .bottom .container .title {
    margin: var(--spacing-lg) 0;
    text-align: center;
  }

  .bottom .submit .row-login {
    width: 100%;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    margin: var(--spacing-md) 0 var(--spacing-sm) 0;
    padding: var(--spacing-md);
    font-size: 16px;
    border-radius: var(--border-radius-small);
    transition: all var(--transition-duration) var(--transition-function);

    &:hover {
      background-color: var(--primary-hover);
      border-color: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-light);
    }
  }

  .bottom .submit {
    display: flex;
    justify-content: center;
  }

  .footer {
    margin-top: var(--spacing-xl);
    text-align: center;

    .msg1 {
      font-size: 18px;
      color: #fff;
      margin-bottom: var(--spacing-sm);
    }

    .msg2 {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 70px;

      a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;

        &:hover {
          color: #fff;
        }
      }
    }
  }

  .bottom .options {
    margin-bottom: var(--spacing-xl);
    color: var(--warning-color);
    display: flex;
    justify-content: space-between;

    > a {
      color: var(--warning-color);
      transition: color 0.3s;

      &:hover {
        color: var(--primary-hover);
      }
    }

    .register {
      span:nth-child(1) {
        color: var(--text-color-secondary);
      }

      a {
        color: var(--primary-color);
        font-weight: 500;

        &:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  #login {
    .top .icon-kaoshi {
      font-size: 50px;
    }

    .top .title {
      font-size: 22px;
    }

    .bottom {
      padding: var(--spacing-md);

      .title {
        font-size: 22px;
      }
    }
  }
}
</style>
