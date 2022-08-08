<template>
  <div class="content-wrap">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover">
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
