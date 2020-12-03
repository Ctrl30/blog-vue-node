<template>
  <div class="wrapper">
    <div class="concent">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button>退出登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nickname: "xxx"
      },
      //   imageUrl:'http://s3.cn-north-1.amazonaws.com.cn/photo-center-prov/imagesThumbs/91rr3AHARTasVhdqqVyNm4TGH9ub5wHb8VhZiE45/63295443b25ded25a39fa5b0906ef67c.jpg'
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess: () => {},
    beforeAvatarUpload: () => {},
    save: function() {
      console.log("fuckyou ", this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
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