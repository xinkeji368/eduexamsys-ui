<!-- 顶部信息栏 -->
<template>
  <header id="topbar">
    <el-row>
      <el-col :span="4" class="topbar-left">
        <i class="iconfont icon-kaoshi"></i>
        <span class="title" @click="index()">学生练习考试测试系统</span>
      </el-col>
      <el-col :span="20" class="topbar-right">
        <i class="el-icon-menu" @click="toggle()"></i>
        <div class="user">
          <span>{{user.userName}}</span>
          <img src="@/assets/img/userimg.png" class="user-img" ref="img" @click="showSetting()" />
          <transition name="fade">
            <div class="out" ref="out" v-show="login_flag">
              <ul>
                <li><a href="javascript:;">用户信息</a></li>
                <li><a href="javascript:;">设置</a></li>
                <li class="exit" @click="exit()"><a href="javascript:;">退出登录</a></li>
              </ul>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import store from '@/vuex/store'
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      login_flag: false,
      user: { //用户信息
        userName: null,
        userId: null
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: mapState(["flag","menu"]),
  methods: {
    //显示、隐藏退出按钮
    showSetting() {
      this.login_flag = !this.login_flag
    },
    //左侧栏放大缩小
    ...mapMutations(["toggle"]),
    getUserInfo() { //获取用户信息
      let userName = this.$cookies.get("cname")
      let userId = this.$cookies.get("cid")
      this.user.userName = userName
      this.user.userId = userId
    },
    index() {
      this.$router.push({path: '/index'})
    },
    exit() {
      let role = this.$cookies.get("role")
      this.$router.push({path:"/"}) //跳转到登录页面
      this.$cookies.remove("cname") //清除cookie
      this.$cookies.remove("cid")
      this.$cookies.remove("role")
      if(role == 0) {
        this.menu.pop()
      }
    }
  },
  store
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#topbar {
  position: relative;
  z-index: 10;
  background-color: var(--bg-color-page);
  height: 80px;
  line-height: 80px;
  color: #fff;
  box-shadow: var(--shadow-medium);
}

#topbar .topbar-left {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}

.topbar-left .icon-kaoshi {
  font-size: 60px;
  color: var(--primary-color);
}

.topbar-left .title {
  font-size: 20px;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
}

.topbar-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar-right .user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.topbar-right .el-icon-menu {
  font-size: 30px;
  margin-left: var(--spacing-md);
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-hover);
  }
}

.topbar-right .user {
  position: relative;
  margin-right: var(--spacing-xl);
  display: flex;
  align-items: center;
}

.topbar-right .user .user-img {
  margin-top: 15px;
  margin-left: var(--spacing-sm);
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
}

.user .out {
  font-size: 14px;
  position: absolute;
  top: 80px;
  right: 0;
  background-color: var(--bg-color);
  box-shadow: var(--shadow-medium);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-small);
  min-width: 120px;
}

.user .out ul {
  list-style: none;
}

.user .out ul > li {
  height: 26px;
  line-height: 26px;
  transition: background-color 0.3s;
  padding: 0 var(--spacing-sm);
  border-radius: var(--border-radius-small);

  &:hover {
    background-color: var(--bg-color-hover);
  }
}

.out a {
  text-decoration: none;
  color: var(--text-color);
  display: block;
}

.out .exit {
  margin-top: var(--spacing-xs);
  padding-top: var(--spacing-xs);
  border-top: 1px solid var(--border-color);
}
</style>
