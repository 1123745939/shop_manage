<template>
  <div class="header">
    <div class="left-wrapper">
      <i class="el-icon-menu"
         @click="changeCollapse"></i>
      <router-link to="/"
                   tag="span">后台管理系统</router-link>
    </div>
    <div class="right-wrapper">
      <el-dropdown trigger="click"
                   @command="handleCommand">
        <span class="el-dropdown-link textcolor">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='checkOut'>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {

    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'checkOut':
          localStorage.removeItem('token')
          this.$router.push('/login')
          break
        default:
          break
      }
    },
    changeCollapse () {
      // this.$emit('changeCollapse')
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  .left-wrapper {
    height: 55px;
    line-height: 55px;
    font-size: 24px;
    cursor: pointer;
  }
  .right-wrapper {
    height: 55px;
    line-height: 55px;
    font-size: 26px;
    .el-dropdown {
      cursor: pointer;
    }
    .textcolor {
      color: #fff;
    }
  }
}
</style>
