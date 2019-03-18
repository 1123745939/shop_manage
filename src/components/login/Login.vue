<template>
  <el-row type="flex"
          class="login-wrapper"
          justify="center"
          align="middle">
    <el-col :span="6"
            class="login-content"
            :xs="12"
            :sm="10"
            :md="8"
            :lg="6">
      <el-form :model="loginForm"
               status-icon
               :rules="rules"
               ref="loginForm"
               label-position="top">
        <el-form-item label="用户名"
                      prop="username">
          <el-input type="text"
                    v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('loginForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '用户名在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$http
        .post('/login', this.loginForm)
        .then(res => {
          const { data, meta } = res.data
          if (meta.status === 200) {
            // 将登录成功标识存入localStorage
            console.log(data)
            localStorage.setItem('token', data.token)
            this.$router.push('/home')
          } else {
            console.log(meta.msg)
          }
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  height: 100%;
  background-color: #2d434c;
  .login-content {
    padding: 20px 35px;
    border-radius: 10px;
    min-width: 240px;
    background-color: #fff;
  }
}
</style>
