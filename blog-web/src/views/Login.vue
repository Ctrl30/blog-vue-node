<template>
  <div class="sign_box">
    <div class="signIn" v-if="status === 1">
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
        key="login"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="loginForm.passWord"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('loginForm')"
            class="signBtn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <span class="signText" @click="toSignUp">注册新账号</span>
    </div>
    <div class="signUp" v-else>
      <el-form
        :model="regForm"
        :rules="regRules"
        ref="regForm"
        label-width="0px"
        key="register"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="regForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="regForm.passWord"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickName">
          <el-input
            v-model="regForm.nickName"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="signUp('regForm')" class="signBtn"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <span class="signText" @click="toSignIn">返回登录</span>
    </div>
    <div v-loading.fullscreen.lock="loading"></div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      status: 1,
      loading: false,
      loginForm: {
        userName: "",
        passWord: "",
      },
      regForm: {
        userName: "",
        passWord: "",
        nickName: "",
      },
      regRules: {
        userName: [
          { required: true, message: "请输入账号123213", trigger: "blur" },
        ],
        passWord: [{ validator: validatePass, trigger: "blur" }],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
      loginRules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let result = await this.$axios.post(
            "/api/users/login",
            this.loginForm
          );
          if (result) {
            Cookie.set("token", result.data.token);
            this.loading = false;
            // localStorage.setItem('token', result.data.token);
            this.$store.commit("changeIsSignIn", result.data.token);
            this.$store.commit("setToken", result.data.token);
            this.$router.push({ name: "home" });
          }
        } else {
          return false;
        }
      });
    },
    signUp(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/api/users/register", this.regForm).then((res) => {
            if (res.data.code === 0) {
              this.$message.success('注册成功')
              this.status = 1;
            }else{
              this.$message.error(res.data.msg)
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toSignUp() {
      this.status = 2;
    },
    toSignIn() {
      this.status = 1;
    },
  },
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
