<template>
  <header>
    <div class="wrapper">
      <el-row>
        <el-col :span="4">
          <div class="logo">Logan Blog</div>
        </el-col>
        <el-col :span="20">
          <el-menu
            class="nav"
            mode="horizontal"
            :default-active="$route.path"
            @select="handleSelect"
            background-color="#2d2d2d"
            text-color="#9d9d9d"
            active-text-color="#fff"
          >
            <el-menu-item index="/">
              <router-link to="/">
                <i class="iconfont icon-home"></i> 首页
              </router-link>
            </el-menu-item>
            <el-menu-item index="/article">
              <router-link to="/article" v-if="isSignIn">我的博客</router-link>
            </el-menu-item>
            <el-menu-item index="/login" v-if="!isSignIn">
              <router-link class="signBtn" to="/login">登录</router-link>
            </el-menu-item>
            <el-menu-item index="/personal" v-else-if="isSignIn">
              <router-link class="signBtn" to="/personal">{{userInfo.nickName}}</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/",
      userInfo: {}
    };
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
    },
    getUserInfo() {
      this.$axios.get("/api/users/info").then((res) => {
        console.log("res", res);
        const result = res.data;
        if (result) {
          this.userInfo = result.data
        }
      });
    },
  },
  computed: {
    isSignIn() {
      return this.$store.state.token;
    },
  },
  created() {
    this.getUserInfo()
  },
};
</script>

<style lang="scss" scoped>
header {
  background: #2d2d2d;
  color: #9d9d9d;
  box-shadow: 0 2px 4px 1px rgba($color: #000, $alpha: 0.5);
  margin-bottom: 20px;
  .logo {
    line-height: 60px;
    font-size: 18px;
  }
  .nav {
    float: right !important;
    border-bottom: none;
    li {
      padding: 0;
      a {
        display: inline;
        padding: 20px;
      }
    }
  }
}
.signBtn {
  // background-color: #3b99fc;
  // color: #fff !important;
  // line-height: 60px;
  // height: 110%;
}
</style>