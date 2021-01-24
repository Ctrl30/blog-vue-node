<template>
  <div class="wrapper">
    <div class="concent">
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="昵称">
          <el-input v-model="form.nickName" class="nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://106.52.102.92:3000/api/users/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="headImg"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>tip 请上传图片</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="quit">退出登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      form: {
        nickName: "xxx",
      },
      imageUrl: "",
      // imageUrl: ""
    };
  },
  methods: {
    quit() {
      Cookie.set("token", "");
      this.$store.commit("setToken", "");
      this.$router.push({
        path: "/login",
      });
    },
    handleAvatarSuccess(res) {
      console.log("val", res);
      this.imageUrl = res.data.imgUrl;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2m = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("不是jpg");
      // }
      if (!isLt2m) {
        this.$message.error("大小超过2m");
      }
      return isLt2m;
    },
    async save() {
      console.log("fuckyou ", this.form);
      let res = await this.$axios.post("/api/users/updateUser", {
        nickName: this.form.nickName,
        headImg: this.imageUrl,
      });
      console.log("ressss", res);
      if (res?.data?.code === 0) {
        // this.getUserInfo()
        this.$message({
          message: "更新成功",
          type: "success",
        });
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    },
    getUserInfo() {
      this.$axios.get("/api/users/info").then((res) => {
        console.log("res", res);
        const result = res.data;
        if (result) {
          this.form.nickName = result.data.nickName;
          this.imageUrl = result.data.headImg;
        }
      });
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.nickname {
  width: 70%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.content {
  width: 40%;
  margin: 0 auto;
  padding: 50px 0;
}
</style>