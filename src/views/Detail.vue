<template>
  <div class="blog-content-box">
    <div class="wrapper">
      <h1 class="title">nodejs教程</h1>
      <div class="time">
        <span class="date">
          <i class="iconfont icon-date"></i>2020-09-17 11:17:20
        </span>
      </div>
      <div class="detail">
        <mavon-editor
          v-model="content"
          :toolbarsFlag="false"
          :subfield="false"
          defaultOpen="preview"
        ></mavon-editor>
      </div>
      <Comment></Comment>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue';

export default {
  data() {
    return {
      content: "hello fuck you "
    };
  },
  components:{
    Comment,
  }
};
</script>

<style lang="scss" scoped>
.blog-content-box {
  min-width: calc(100vh -220px);
}
.wrapper {
  padding: 20px;
  background: #f8f8fd;
  text-align: center;
  box-shadow: 0 1px rgba($color: #000000, $alpha: 0.4),
    0 0 30px rgba($color: #0a0a00, $alpha: 0.1) inset;
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 28px;
  }
  .time {
    margin: 10px 0 40px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    color: #999;
    .iconfont {
      color: #666;
      margin-right: 5px;
    }
  }
}
</style>