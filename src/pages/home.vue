<template>
  <div>
    <router-link to="/bpmn/index">bpmn功能演示</router-link>
    <router-link to="/bpmn/fullScreen">局部组件全屏</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    data(){
      return {

      }
    },
  }
</script>
<style scoped>

</style>
