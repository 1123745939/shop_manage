<template>
  <el-form :model="ruleForm"
           status-icon
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           label-position="top">
    <el-form-item label="用户名"
                  prop="username">
      <el-input type="text"
                v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码"
                  prop="password">
      <el-input type="password"
                v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
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

<style lang="" scoped>
</style>
