<template>
  <div class="wrapper">
    <h1 class="title">文章列表</h1>
    <div class="article">
      <el-button type="primary" size="default" @click="handleAdd" class="addBtn"
        >新增+</el-button
      >
      <el-table :data="articleList" border stripe="">
        <el-table-column
          prop="title"
          label="标题"
          width="380"
        ></el-table-column>
        <el-table-column prop="create_time" label="日期" width="380">
          <template slot-scope="record">
            <i class="el-icon-time"></i>
            <span>{{ record.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="opt" label="操作">
          <template slot-scope="record">
            <el-button size="mini" @click="handleDetail(record)"
              >查看</el-button
            >
            <el-button type="success" size="mini" @click="handleEdit(record)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="handleDelete(record)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
    };
  },
  created() {
    this.$axios.get('/api/article/myList')
    .then(res=>{
      this.articleList = res.data.data;
    })
  },
  methods: {
    handleDetail: (record) => {
      const { id } = record.row;
      window.open(`#/detail/${id}`);
    },
    handleEdit(record) {
      const { id } = record.row;
      this.$router.push({
        path: `/article/edit/${id}`,
      });
    },
    handleDelete(record){
      const { id } = record.row;
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/article/delete',{
            articleId:id
          }).then(res=>{
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
            });
            location.reload();
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: `已取消删除${id}`
          });          
        });
    },
    handleAdd() {
      this.$router.push({
        name: "editArticle",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 30px 0;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
}
.article {
  .addBtn {
    float: right;
    margin-bottom: 20px;
  }
}
</style>