<template>
  <el-container class="home-wrapper">
    <el-header>
      <header-bar @changeCollapse="changeCollapse"></header-bar>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <side-bar :isCollapse="isCollapse"></side-bar>
      </el-aside>
      <el-main>
        <!-- <bread-crumb></bread-crumb> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script type="text/javascript">
import sideBar from './Sidebar'
import HeaderBar from './Header'
import BreadCrumb from './BreadCrumb'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  created () {
    this.curRoute = this.$route.name
  },
  components: {
    sideBar,
    HeaderBar,
    BreadCrumb
  }
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  height: 100%;
  .el-header {
    background-color: #242f42;
    color: #fff;
  }

  .el-aside {
    background-color: #324157;
  }

  .el-main {
    background-color: #e9eef3;
  }
}
</style>
