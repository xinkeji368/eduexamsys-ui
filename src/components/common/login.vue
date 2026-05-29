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
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              label-position="left"
              label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model.number="loginForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" @keyup.enter.native="handleLogin"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="rememberMe">记住我</el-checkbox>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-login" :loading="loading" @click="handleLogin">登录</el-button>
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
        <p class="msg2">版权所有 ©2023 保留所有权利  <a href="http://beian.miit.gov.cn/" target="_blank">ICP备9527号</a></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from '@/api/auth'
import storage from '@/utils/storage'

const roleHomeMap = {
  '0': '/admin',
  '1': '/teacher',
  '2': '/student'
}

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, message: '密码长度不能少于3位', trigger: 'blur' }
        ]
      },
      rememberMe: false,
      loading: false
    }
  },
  mounted() {
    if (localStorage.getItem('rememberMe') === 'true') {
      this.loginForm.username = Number(localStorage.getItem('username')) || ''
      this.loginForm.password = localStorage.getItem('password') || ''
      this.rememberMe = true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return
        this.loading = true
        login(this.loginForm)
          .then(res => {
            const data = res.data
            if (this.rememberMe) {
              localStorage.setItem('username', this.loginForm.username)
              localStorage.setItem('password', this.loginForm.password)
              localStorage.setItem('rememberMe', 'true')
            } else {
              localStorage.removeItem('username')
              localStorage.removeItem('password')
              localStorage.removeItem('rememberMe')
            }

            this.$store.dispatch('user/login', {
              token: data.token,
              userInfo: {
                id: data.userId,
                name: data.userName,
                role: data.role
              }
            })

            const homePath = roleHomeMap[data.role] || '/'
            this.$router.push(homePath)
          })
          .catch(() => {
            this.$message.error('用户名或密码错误')
          })
          .finally(() => {
            this.loading = false
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

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
