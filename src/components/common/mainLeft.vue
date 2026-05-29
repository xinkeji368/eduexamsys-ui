<template>
  <div id="left">
    <el-menu
      active-text-color="#334046"
      text-color="#000"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="sidebarCollapsed"
      background-color="#334046"
      menu-trigger="click"
      router>
      <el-submenu v-for="(item, index) in currentMenu" :index="item.index" :key="index">
        <template slot="title">
          <div class="left-width">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title" class="title">{{ item.title }}</span>
          </div>
        </template>
        <el-menu-item-group v-for="(list, idx) in item.content" :key="idx">
          <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item1 != null">{{ list.item1 }}</el-menu-item>
          <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item2 != null">{{ list.item2 }}</el-menu-item>
          <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item3 != null">{{ list.item3 }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'mainLeft',
  computed: {
    ...mapGetters('user', ['userRole']),
    ...mapGetters('menu', { getMenuByRole: 'menuByRole' }),
    currentMenu() {
      return this.getMenuByRole(this.userRole)
    },
    sidebarCollapsed() {
      return this.$store.state.user.sidebarCollapsed
    }
  },
  methods: {
    handleTitle(index) {
      this.bus.$emit('sendIndex', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.el-menu-vertical-demo .el-submenu__title {
  overflow: hidden;
}

.left-width .iconfont {
  font-size: 18px;
  color: #fff;
}

.left-width {
  width: 213px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 900px;
}

#left {
  height: 900px;
  background-color: var(--bg-color-page);
  z-index: 0;
}

#left .el-menu-vertical-demo .title {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 14px;
}

.el-submenu {
  border-bottom: 1px solid var(--border-color) !important;
}

.el-submenu__title:hover {
  background-color: var(--primary-color) !important;
}

.el-submenu__title i {
  color: #fbfbfc !important;
}

.el-menu-item {
  color: #fff !important;
}

.el-menu-item:hover {
  background-color: var(--primary-color) !important;
  color: #fff !important;
}

.el-menu-item.is-active {
  background-color: var(--primary-color) !important;
  color: #fff !important;
}
</style>
