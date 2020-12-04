<template>
  <div class="wrapper">
    <div class="backBtn">
      <el-button size="default" @click="goBack">返回</el-button>
    </div>
    <div class="editTitle">标题</div>
    <el-input
      v-model="title"
      placeholder="请输入标题"
      size="normal"
      clearable
    ></el-input>
    <div class="editTitle">内容编辑器</div>
    <div class="markdown"></div>
       <mavon-editor
          v-model="content"
        />
        <div class="saveBtn">
            <el-button type="primary" size="default" @click="save">保存</el-button>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    goBack(){
        this.$router.go(-1)
      console.log("返回");
    },
    save(){

    },
  },
};
</script>

<style lang="scss" scoped>
.backBtn{
    text-align: center;
    float: right;
    margin-bottom: 40px;
}
.editTitle{
    margin: 20px 0;
    font-size: 26px;
    font-weight: 700;
}
.saveBtn{
    margin: 40px 0;
}
</style>