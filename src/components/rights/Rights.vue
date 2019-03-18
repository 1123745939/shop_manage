<template>
  <div class="">
    <el-table :data="rightsList"
              stripe
              style="width: 100%">
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column prop="authName"
                       label="权限名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="path"
                       label="路径"
                       width="180">
      </el-table-column>
      <el-table-column prop="level"
                       label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRightsList()
  },
  methods: {
    async getRightsList () {
      const res = await this.$http('/rights/list')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.rightsList = data
      } else {
        this.$message({
          message: '获取权限列表失败',
          type: 'error'
        })
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
