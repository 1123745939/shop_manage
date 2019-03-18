<template>
  <el-row>
    <el-breadcrumb separator="/"
                   class="shop-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
</template>

<script type="text/javascript">
export default {
  props: {
    curRoute: String
  }
}
</script>

<style lang="scss" scoped>
.shop-breadcrumb {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  font-size: 18px;
  background-color: #d4dae0;
  margin-bottom: 10px;
}
</style>
