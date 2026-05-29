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
            <el-form
              ref="registerForm"
              :model="registerForm"
              :rules="registerRules"
              label-position="left"
              label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model.number="registerForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="registerForm.confirmPassword" placeholder="请再次输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="registerForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="tel">
                <el-input v-model="registerForm.tel" placeholder="请输入电话号码"></el-input>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-register" :loading="loading" @click="handleRegister">注册</el-button>
              </div>
              <div class="options">
                <p class="back"><router-link to="/">返回登录</router-link></p>
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
import { register } from '@/api/auth'

export default {
  name: 'register',
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        tel: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, message: '密码长度不能少于3位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (!valid) return
        this.loading = true
        register(this.registerForm)
          .then(() => {
            this.$message.success('注册成功，请登录')
            setTimeout(() => {
              this.$router.push('/')
            }, 1500)
          })
          .catch(() => {
            this.$message.error('注册失败，请稍后重试')
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

#register {
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

  .bottom .submit .row-register {
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
    justify-content: center;

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
</style>
