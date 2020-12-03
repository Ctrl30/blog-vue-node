<template>
  <div class="list">
    <div class="card">
      <router-link :to="'/detail/'+1">
        <p class="title">nodejs教程</p>
      </router-link>
      <p class="date">2020-09-17</p>
    </div>
    <div class="card">
      <router-link :to="'/detail/'+1">
        <p class="title">vue教程</p>
      </router-link>
      <p class="date">2020-09-18</p>
    </div>
    <div class="card">
      <router-link :to="'/detail/'+1">
        <p class="title">react教程</p>
      </router-link>
      <p class="date">2020-09-19</p>
    </div>
    <div class="card">
      <router-link :to="'/detail/'+1">
        <p class="title">mobx教程</p>
      </router-link>
      <p class="date">2020-09-20</p>
    </div>
    <div class="card">
      <router-link :to="'/detail/'+1">
        <p class="title">redux教程</p>
      </router-link>
      <p class="date">2020-09-21</p>
    </div>
    <div class="card">
      <router-link :to="'/detail/'+1">
        <p class="title">mysql教程</p>
      </router-link>
      <p class="date">2020-09-22</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card{
    padding-bottom: 20px;
    margin-top: 10px;
    border-bottom: 1px solid #eee;
    .title{
        color: #0085a1;
        font-size: 26px;
        font-weight: 600;
    }
    .date{
        font-style: italic;
        font-family: Lora,'Times New Roman', Times, serif;
        margin-top: 10px;
        color: #808080;
    }
}
</style>