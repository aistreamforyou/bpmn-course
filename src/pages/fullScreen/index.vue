<template>
  <div>
    <div style="display: flex;justify-content: space-between;">
      <div :class="['block_back',isFull1?'full-screen':'']" style="background-color: lightgreen">
        <el-button type="primary" @click="changeSize('1')">{{isFull1?'取消全屏':'全屏'}}</el-button>
      </div>
      <div :class="['block_back',isFull2?'full-screen':'']" style="background-color: lightskyblue">
        <el-button type="primary" @click="changeSize('2')">{{isFull2?'取消全屏':'全屏'}}</el-button>
      </div>
      <div :class="['block_back',isFull3?'full-screen':'']" style="background-color: lightgrey">
        <el-button type="primary" @click="changeSize('3')">{{isFull3?'取消全屏':'全屏'}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Index',
    data(){
      return {
        isFull1: false,
        isFull2: false,
        isFull3: false,
      }
    },
    methods: {
      changeSize(no){
        this[`isFull${no}`] = !this[`isFull${no}`]
      },
    }
  }
</script>
<style scoped lang="scss">
  .block_back{
    width: 300px;
    height: 300px;
    .icon-size{
      width: 30px;
      height: 30px;
      color: red;
    }
  }
  .full-screen{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
</style>
