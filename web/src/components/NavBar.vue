<!-- 导航栏 -->
<template>
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container">
    <!-- <a class="navbar-brand" href="/">King Of Bots</a> -->
    <!-- a标签 -> router-link 避免页面刷新 -->
    <router-link class="navbar-brand" :to="{name : 'home'}">King Of Bots</router-link>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <router-link :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'" aria-current="page" :to="{ name: 'pk_index' }">对战</router-link>
        <!-- class="nav-link"：为链接添加 CSS 类，通常用于应用导航样式。
                :to：这是 <router-link> 最重要的属性，用于指定目标路由。这里使用了对象语法：
                name: 'ranklist_index'：通过路由的名称（name）来指定目标路由。 -->        
        </li>
        <li class="nav-item">
        <router-link :class="route_name == 'record_index' ? 'nav-link active' : 'nav-link'" :to="{ name: 'record_index' }">对局列表</router-link>
        </li>
        <li class="nav-item">
        <router-link :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'" :to="{ name: 'ranklist_index' }">排行榜</router-link>
        </li>
      </ul>
     <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ZK
          </a>
          <ul class="dropdown-menu">
            <li>
                <router-link class="dropdown-item" :to="{ name: 'user_bot_index' }">我的Bots</router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">退出</a></li>
            <li><a class="dropdown-item" href="#">反馈</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
    setup() {
        const route = useRoute();
        let route_name = computed(() => route.name)
        return {
            route_name
        }
    }
}
</script>

<style scoped>
</style>