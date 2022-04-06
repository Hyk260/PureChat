<template>
  <div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Login } from '@/api/user';
let socketIo = require('socket.io');
// const low = require("lowdb");
const pageData = reactive({
  phone: '17671697956',
  password: 'abc',
})

const sub = async () => {
  // let data = await Login({
  //   phone:'17671697956',
  //   password:'abc'
  // })
  console.log(low)
}
</script>

<style>
</style>