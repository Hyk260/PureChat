<template>
  <div>
    <!-- <l-orbit size="25" speed="1.5" color="black"></l-orbit> -->
    <svg class="loading" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="12" r="0" transform="translate(8 0)">
        <animate
          attributeName="r"
          begin="0"
          calcMode="spline"
          dur="1.2s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
          keyTimes="0;0.2;0.7;1"
          repeatCount="indefinite"
          values="0; 4; 0; 0"
        ></animate>
      </circle>
      <circle cx="0" cy="12" r="0" transform="translate(16 0)">
        <animate
          attributeName="r"
          begin="0.3"
          calcMode="spline"
          dur="1.2s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
          keyTimes="0;0.2;0.7;1"
          repeatCount="indefinite"
          values="0; 4; 0; 0"
        ></animate>
      </circle>
      <circle cx="0" cy="12" r="0" transform="translate(24 0)">
        <animate
          attributeName="r"
          begin="0.6"
          calcMode="spline"
          dur="1.2s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
          keyTimes="0;0.2;0.7;1"
          repeatCount="indefinite"
          values="0; 4; 0; 0"
        ></animate>
      </circle>
    </svg>
  </div>
</template>

<script setup>
// import "ldrs/orbit";
</script>

<style lang="scss" scoped>
.loading {
  stroke: none;
  fill: currentColor;
  width: 28px;
  font-size: 16px;
}
.svg-icon {
  stroke: none;
  fill: rgb(153, 153, 153);
  width: 32px;
}
</style>
