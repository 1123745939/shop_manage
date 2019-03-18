<template>
  <el-menu :default-active="curRoute"
           class="sidebar-el-menu"
           background-color="#324157"
           text-color="#fff"
           active-text-color="#409eff"
           :collapse="isCollapse"
           :router="true">
    <el-menu-item index="home">
      <i class="iconfont icon-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="iconfont icon-user"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="users">
        <i class="iconfont icon-user1"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="rights">
        <i class="el-icon-tickets"></i>
        <span slot="title">权限列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>角色管理</span>
      </template>
      <el-menu-item index="roles">
        <i class="el-icon-tickets"></i>
        <span slot="title">角色列表</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      curRoute: ''
    }
  },
  props: {
    isCollapse: Boolean
  },
  created () {
    this.curRoute = this.$route.name
  }
}
</script>

<style lang="scss" scoped>
.sidebar-el-menu {
  display: inline-block;
  border-color: #324157;
  i {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
