export default {
  data () {
    return {
      rolesList: [],
      roleDialogVisible: false,
      rightsDialogVisible: false,
      roleEditForm: {
        id: -1,
        roleName: '',
        roleDesc: ''
      },
      hasRightsTreeData: [],
      allRightsTreeData: [],
      // 树形配置
      defaultProps: {
        // 用来指定使用哪个属性为子节点
        children: 'children',
        // label 用来指定使用数据中哪个属性展示
        label: 'authName'
      },
      curRoleId: ''
    }
  },
  methods: {
    /**
     * 加载角色列表
     */
    async getRolesList () {
      const res = await this.$http.get('/roles')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.rolesList = data
      } else {
        this.$message({
          message: '获取角色列表失败',
          type: 'error'
        })
        return false
      }
    },
    /**
     * 根据角色 id 删除角色
     * @param {number} id 要删除角色的id
     */
    async delRoleById (id) {
      try {
        // 等待promise
        await this.$confirm('确认删除该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await this.$http.delete(`/roles/${id}`)
        const { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          const index = this.rolesList.findIndex(item => item.id === id)
          this.rolesList.splice(index, 1)
        }
      } catch (err) {
        this.$message({
          type: 'info',
          message: '取消删除!'
        })
      }
    },
    /**
     * 显示角色修改对话框
     * @param {arr} curRole
     */
    showRoleEditDialog (curRole) {
      for (const key in this.roleEditForm) {
        this.roleEditForm[key] = curRole[key]
      }
      this.roleDialogVisible = true
    },
    /**
     * 修改角色信息
     */
    async editRole () {
      const { id, roleName, roleDesc } = this.roleEditForm
      const res = await this.$http.put(`/roles/${id}`, {
        id,
        roleName,
        roleDesc
      })
      const { meta } = res.data
      if (meta.status === 200) {
        this.$message({
          message: '修改角色信息成功',
          type: 'success'
        })
        this.roleDialogVisible = false
        this.getRolesList()
      }
    },
    /**
     * 删除角色权限
     * @param {number} roleId 角色id
     * @param {number} rightId 权限id
     */
    async delRoleRightById (roleId, rightId) {
      const res = await this.$http.delete(`/roles/${roleId}/rights/${rightId}`)
      const { data, meta } = res.data
      if (meta.status === 200) {
        const curRole = this.rolesList.find(item => item.id === roleId)
        curRole.children = data
        this.$message({
          message: '删除角色权限成功',
          type: 'success'
        })
      }
    },
    showRightsDialog (curRoleRights, curRoleId) {
      const level3Id = []
      curRoleRights.forEach(level2 => {
        level2.children.forEach(level3 => {
          level3Id.push(level3.id)
        })
      })
      this.rightsDialogVisible = true
      this.curRoleId = curRoleId
      // 在Dialog渲染完毕后设置Tree组件
      this.$nextTick(() => {
        this.$refs.rightsTree.setCheckedKeys(level3Id)
      })
    },
    /**
     * 获取全部角色权限
     */
    async getAllRightsTree () {
      const res = await this.$http.get('/rights/tree')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.allRightsTreeData = data
      }
    },
    /**
     * 分配角色权限
     */
    async assignRights () {
      const checkedKeys = this.$refs.rightsTree.getCheckedKeys()
      const halfCheckedKeys = this.$refs.rightsTree.getHalfCheckedKeys()
      const allCheckedKeys = [...checkedKeys, ...halfCheckedKeys]
      const res = await this.$http.post(`/roles/${this.curRoleId}/rights`, {
        rids: allCheckedKeys.join(',')
      })
      console.log(res)
      const { meta } = res.data
      if (meta.status === 200) {
        this.rightsDialogVisible = false
        this.$message({
          message: '更新角色权限成功',
          type: 'success'
        })
      }
    }
  },
  created () {
    this.getRolesList()
    this.getAllRightsTree()
  }
}
