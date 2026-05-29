<template>
  <div id="index">
    <app-header class="topbar"></app-header>
    <section class="container">
      <div class="left_side">
        <main-left></main-left>
      </div>
      <div class="main_wrapper">
        <navigator class="nav"></navigator>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import AppHeader from '@/components/common/header'
import MainLeft from '@/components/common/mainLeft'
import Navigator from '@/components/common/navigator'

export default {
  components: {
    AppHeader,
    MainLeft,
    Navigator
  }
}
</script>

<style lang="scss" scoped>
#index .nav {
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}
.container {
  display: flex;
  background-color: #fff;
}
.main_wrapper {
  overflow: hidden;
  flex: 1;
  background-color: #fff;
}
</style>
