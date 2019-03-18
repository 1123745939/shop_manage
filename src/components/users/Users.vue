<template>
  <div class="">
    <el-row>
      <el-breadcrumb separator="/"
                     class="shop-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="topBar">
      <el-col :span="8">
        <el-input placeholder="请输入内容"
                  v-model="searchText"
                  class="input-with-select">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4"
              class="addBtn">
        <el-button type="success"
                   plain
                   @click="showAddUserDialog">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table :data="userList"
              stripe
              style="width: 100%">
      <el-table-column prop="username"
                       label="用户名"
                       width="180">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       width="180">
      </el-table-column>
      <el-table-column prop="mobile"
                       label="手机号"
                       width="180">
      </el-table-column>
      <el-table-column prop="mg_state"
                       label="用户状态"
                       width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     @change="changeStatus(scope.row.id,scope.row.mg_state)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop=""
                       label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     plain
                     size="mini"
                     @click="showUserEditDialog(scope.row)"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     plain
                     size="mini"
                     @click="delUserById(scope.row.id)"></el-button>
          <el-button type="success"
                     icon="el-icon-check"
                     plain
                     size="mini"
                     @click="showUserAssignRole(scope.row.id,scope.row.username)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination :current-page.sync="currentPage"
                   :page-sizes="[2, 5, 10, 15]"
                   :page-size.sync="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户"
               :visible.sync="addUserDialogVisible">
      <el-form :model="userAddForm"
               :rules="userRules"
               ref="userAddForm">
        <el-form-item prop="username"
                      label="用户名"
                      :label-width="formLabelWidth">
          <el-input v-model="userAddForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password"
                      label="密码"
                      :label-width="formLabelWidth">
          <el-input v-model="userAddForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email"
                      label="邮箱"
                      :label-width="formLabelWidth">
          <el-input v-model="userAddForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile"
                      label="手机号"
                      :label-width="formLabelWidth">
          <el-input v-model="userAddForm.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户"
               :visible.sync="editUserDialogVisible">
      <el-form :model="userEditForm"
               :rules="userRules"
               ref="userEditForm">
        <el-form-item prop="username"
                      label="用户名"
                      :label-width="formLabelWidth">
          <el-input :value="userEditForm.username"
                    autocomplete="off"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="email"
                      label="邮箱"
                      :label-width="formLabelWidth">
          <el-input v-model="userEditForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile"
                      label="手机号"
                      :label-width="formLabelWidth">
          <el-input v-model="userEditForm.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户分配角色对话框 -->
    <el-dialog title="角色信息修改"
               :visible.sync="assignRoleDialogVisible">
      <el-form :model="assignRoleForm">
        <el-form-item label="用户名"
                      label-width="120px">
          <el-input :value="assignRoleForm.username"
                    autocomplete="off"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="角色"
                      label-width="120px">
          <el-select v-model="assignRoleForm.rid"
                     placeholder="请选择">
            <el-option v-for="item in assignRoleForm.roles"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="assignRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="assignRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  created () {
    this.getUserList()
    this.getRolesList()
  },
  data () {
    return {
      userList: [],
      pageSize: 5,
      currentPage: 1,
      total: 10,
      searchText: '',
      addUserDialogVisible: false,
      editUserDialogVisible: false,
      assignRoleDialogVisible: false,
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userEditForm: {
        username: '',
        email: '',
        mobile: ''
      },
      assignRoleForm: {
        id: -1,
        rid: '',
        username: '',
        roles: []
      },
      formLabelWidth: '80px',
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '用户名在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码在 6 到 12 个字符', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        email: [
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: 'email格式不正确', trigger: 'blur' }
        ]
      },
      value: ''
    }
  },
  methods: {
    // 获取管理员列表
    getUserList () {
      this.$http
        .get('/users', {
          params: {
            query: this.searchText,
            pagenum: this.currentPage,
            pagesize: this.pageSize
          }
        })
        .then(res => {
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.userList = data.users
            this.currentPage = data.pagenum
            this.total = data.total
          }
        })
    },
    // 搜索管理员列表
    search () {
      this.currentPage = 1
      this.getUserList()
    },
    // 改变管理员状态
    changeStatus (id, status) {
      this.$http
        .put(`/users/${id}/state/${status}`).then(res => {
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.$message({
              message: data.mg_state === 0 ? '禁用用户成功' : '启用用户成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: meta.msg,
              type: 'error'
            })
          }
        })
    },
    // 分页条pagesize改变事件
    handleSizeChange (val) {
      this.pageSize = val
      this.getUserList()
    },
    // 分页条currentPage改变事件
    handleCurrentChange (val) {
      this.currentPage = val
      this.getUserList()
    },
    // 显示新增用户对话框
    showAddUserDialog () {
      // this.closeResetForm()
      this.addUserDialogVisible = !this.addUserDialogVisible
    },
    // 新增用户对话框确认按钮事件
    addUser () {
      this.$refs.userAddForm.validate(valid => {
        if (valid) {
          this.$http
            .post('/users', this.userAddForm)
            .then(res => {
              console.log(res)
              const { meta } = res.data
              if (meta.status === 201) {
                this.$message({
                  message: '用户添加成功',
                  type: 'success'
                })
                this.addUserDialogVisible = false
                this.getUserList()
                this.closeResetAddForm()
              } else {
                this.$message({
                  message: meta.msg,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            message: '表单验证失败',
            type: 'error'
          })
          return false
        }
      })
    },
    // 根据用户ID删除
    delUserById (id) {
      this.$alert('确认删除用户吗', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$http
            .delete(`users/${id}`)
            .then(res => {
              console.log(res)
              const { meta } = res.data
              if (meta.status === 200) {
                this.$message({
                  message: '用户删除成功',
                  type: 'success'
                })
                const index = this.userList.findIndex(item => item.id === id)
                this.userList.splice(index, 1)
                const totalPage = Math.ceil(this.userList.length / this.pageSize)
                if (this.currentPage > totalPage) {
                  this.getUserList(--this.currentPage)
                }
              } else {
                this.$message({
                  message: meta.msg,
                  type: 'error'
                })
              }
            })
        }
      })
    },
    editUser () {
      this.$refs.userEditForm.validate(valid => {
        if (valid) {
          const { id, mobile, email } = this.userEditForm
          this.$http
            .put(`/users/${id}`, {
              mobile,
              email
            })
            .then(res => {
              console.log(res)
              const { meta } = res.data
              if (meta.status === 200) {
                this.$message({
                  message: '用户修改成功',
                  type: 'success'
                })
                this.editUserDialogVisible = false
                this.getUserList()
                this.closeResetEditForm()
              } else {
                this.$message({
                  message: meta.msg,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            message: '表单验证失败',
            type: 'error'
          })
          return false
        }
      })
    },
    showUserEditDialog (curUser) {
      for (const key in curUser) {
        this.userEditForm[key] = curUser[key]
      }
      this.editUserDialogVisible = true
    },
    showUserAssignRole (curUserId, curUserName) {
      this.assignRoleForm.id = curUserId
      this.assignRoleForm.username = curUserName
      this.assignRoleDialogVisible = true
    },
    /**
     * 加载角色列表
     */
    async getRolesList () {
      const res = await this.$http.get('/roles')
      const { data, meta } = res.data
      if (meta.status === 200) {
        data.forEach(item => {
          const { id, roleName } = item
          this.assignRoleForm.roles.push({ id, roleName })
        })
      } else {
        this.$message({
          message: '获取角色列表失败',
          type: 'error'
        })
        return false
      }
    },
    assignRole () {
      console.log(this.assignRoleForm)
    },
    // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    closeResetAddForm () {
      this.$refs.userAddForm.resetFields()
    },
    closeResetEditForm () {
      this.$refs.userEditForm.resetFields()
    }
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
.topBar {
  margin-bottom: 5px;
  .addBtn {
    padding-left: 20px;
  }
}
</style>
