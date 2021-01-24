<template>
  <div class="wrapper">
    <div class="backBtn">
      <el-button size="default" @click="goBack">返回</el-button>
    </div>
    <div class="editTitle">标题</div>
    <el-input
      v-model="blogDetail.title"
      placeholder="请输入标题"
      size="normal"
      clearable
    ></el-input>
    <div class="editTitle">内容编辑器</div>
    <div class="markdown"></div>
       <mavon-editor
          v-model="blogDetail.content"
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
      blogDetail:{
        title:'',
        content: ''
      },
    };
  },
  methods: {
    goBack(){
        this.$router.go(-1)
    },
    getDetail(){
      this.$axios.get('/api/article/detail',{
        params:{
          articleId:this.$route.params.id
        }
      }).then(res=>{
        this.blogDetail = res.data.data;
      })
    },
    save(){
      if (this.$route.params.id) {
        this.$axios.post('/api/article/update',{
        title:this.blogDetail.title,
        content:this.blogDetail.content,
        articleId: this.$route.params.id
      });
    
      }else{
        this.$axios.post('/api/article/add',{
        title:this.blogDetail.title,
        content:this.blogDetail.content
      })
      .then(res=>{
        if (res.data.code === 0) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$router.push({name: 'article'})
        }
      });
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      // 编辑页面
      this.getDetail();
    }
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