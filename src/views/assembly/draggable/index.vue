<script setup>
  import { ref, onMounted } from 'vue'
  import draggable from 'vuedraggable/src/vuedraggable'
  // import { useRenderIcon } from "/@/components/ReIcon/src/hooks";

  let gridLists = ref([
    { grid: 'cn', num: 1 },
    { grid: 'cn', num: 2 },
    { grid: 'cn', num: 3 },
    { grid: 'cn', num: 4 },
    { grid: 'cn', num: 5 },
    { grid: 'cn', num: 6 },
    { grid: 'cn', num: 7 },
    { grid: 'cn', num: 8 },
    { grid: 'cn', num: 9 },
  ])

  let lists = ref([
    { people: 'cn', id: 1, name: 'www.itxst.com' },
    { people: 'cn', id: 2, name: 'www.baidu.com' },
    { people: 'cn', id: 3, name: 'www.taobao.com' },
    { people: 'cn', id: 4, name: 'www.google.com' },
  ])

  let cutLists = ref([
    { people: 'cn', id: 1, name: 'cut1' },
    { people: 'cn', id: 2, name: 'cut2' },
    { people: 'cn', id: 3, name: 'cut3' },
    { people: 'cn', id: 4, name: 'cut4' },
  ])

  const change = (evt) => {
    console.log('evt: ', evt)
  }

  onMounted(() => {
    // 使用原生sortable实现元素位置切换
    // new Sortable(document.querySelector('.cut-container'), {
    //   swap: true,
    //   forceFallback: true,
    //   chosenClass: 'chosen',
    //   swapClass: 'highlight',
    //   animation: 300,
    // })
  })
</script>

<template>
 
 <div class="text">
   推拽
 </div>
</template>

<style lang="scss" scoped>
  .text{
    height: 100%;
  }
  /* grid列表拖拽 */
  .grid-container {
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    grid-template-rows: 33.3% 33.3% 33.3%;
  }

  .item-single {
    font-size: 1.5em;
    height: 77px;
    text-align: center;
    line-height: 85px;
    border: 1px solid #e5e4e9;
    cursor: move;
  }

  .item-cut {
    font-size: 1.5em;
    height: 77px;
    line-height: 77px;
    text-align: center;
    border: 1px solid #e5e4e9;
    cursor: move;
  }

  .item {
    font-size: 2em;
    text-align: center;
    line-height: 100px;
    border: 1px solid #e5e4e9;
    cursor: move;
  }

  .item-1 {
    background-color: #ef342a;
  }

  .item-2 {
    background-color: #f68f26;
  }

  .item-3 {
    background-color: #4ba946;
  }

  .item-4 {
    background-color: #0376c2;
  }

  .item-5 {
    background-color: #c077af;
  }

  .item-6 {
    background-color: #f8d29d;
  }

  .item-7 {
    background-color: #b5a87f;
  }

  .item-8 {
    background-color: #d0e4a9;
  }

  .item-9 {
    background-color: #4dc7ec;
  }

  .chosen {
    border: solid 2px #3089dc !important;
  }
</style>