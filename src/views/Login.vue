<template>
  <div class="sign_box">
    <div class="signIn" v-if="status ===1">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" key="login">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('loginForm')" class="signBtn">登录</el-button>
        </el-form-item>
      </el-form>
      <span class="signText" @click="toSignUp">注册新账号</span>
    </div>
    <div class="signUp" v-else>
      <el-form :model="regForm" :rules="regRules" ref="regForm" label-width="0px" key="register">
        <el-form-item prop="username">
          <el-input v-model="regForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="regForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input v-model="regForm.checkPass" type="password" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="signUp('regForm')" class="signBtn">注册</el-button>
        </el-form-item>
      </el-form>
       <span class="signText" @click="toSignIn">返回登录</span>
    </div>
    <div v-loading.fullscreen.lock="loading"></div>
  </div>
</template>

<script>
export default {
  
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.regForm.checkPass !== '') {
            this.$refs.regForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      status: 1,
      loading: false,
      loginForm: {
        username: "",
        password: ""
      },
      regForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      regRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      },
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          setTimeout(()=>{
          this.loading = false;
          this.$store.commit('changeIsSignIn',1)
          this.$router.push({name:"home"})
          },1500);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    signUp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('okok')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toSignUp(){
      this.status = 2;
    },
    toSignIn(){
      this.status = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.sign_box {
  width: 300px;
  margin: 200px auto 0;
  text-align: center;
  .signText {
    cursor: pointer;
    color: #3b7bdd;
    &:hover {
      color: #1760d7;
    }
  }
}
.signBtn {
  width: 100%;
  font-size: 18px;
}
</style>
