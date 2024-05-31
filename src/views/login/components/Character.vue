<template>
  <div class="rain">
    <div class="g-container">
      <div class="horn flex justify-center items-center">
        <div class="item top"></div>
        <div class="item right"></div>
        <div class="item left"></div>
        <div class="middle" v-loading="!loading">
          <img src="@/assets/images/log.png" alt="" />
        </div>
      </div>
      <template v-if="!loading">
        <p v-for="item in 20" :key="item"></p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Character",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@200&display=swap");

$str: "ぁぃぅぇぉかきくけこんさしすせそたちつってとゐなにぬねのはひふへほゑまみむめもゃゅょゎをァィゥヴェォカヵキクケヶコサシスセソタチツッテトヰンナニヌネハヒフヘホヱマミムメモャュョヮヲㄅㄉㄓㄚㄞㄢㄦㄆㄊㄍㄐㄔㄗㄧㄛㄟㄣㄇㄋㄎㄑㄕㄘㄨㄜㄠㄤㄈㄏㄒㄖㄙㄩㄝㄡㄥ";
$length: str-length($str);
$n: 50;
$animationTime: 4;
$perColumnNums: 25;

@function randomChar() {
  $r: random($length);
  @return str-slice($str, $r, $r);
}

@function randomChars($number) {
  $value: "";

  @if $number > 0 {
    @for $i from 1 through $number {
      $value: $value + randomChar();
    }
  }
  @return $value;
}
.rain {
  width: 185px;
  height: 185px;
  display: flex;
  overflow: hidden;
}
.horn {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
}
.g-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
  // font-family: "Inconsolata", monospace, sans-serif;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background: #000;
    position: absolute;
    // border-radius: 10px;
    z-index: 2;
    &::after {
      content: "";
      display: inline-block;
      width: 34px;
      height: 34px;
      background: #fff;
      // border-radius: 10px;
    }
    &::before {
      position: absolute;
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #000;
      // border-radius: 4px;
    }
  }
  .top {
    top: 0;
    left: 0;
  }
  .right {
    top: 0;
    right: 0;
  }
  .left {
    left: 0;
    bottom: 0;
  }
  .middle {
    width: 45px;
    height: 45px;
    background: #fff;
    border-radius: 2px;
    z-index: 2;
    img {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      margin: 7.5px;
      position: absolute;
      z-index: 5;
    }
    :deep(.el-loading-mask) {
      background: #ccc0;
    }
  }
}

p {
  position: relative;
  margin: 0;
  width: 5%;
  height: 100%;
  text-align: center;
  font-size: 7px;
  word-break: break-all;
  white-space: pre-wrap;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
  }
}

@for $i from 0 through $n {
  $content: randomChars($perColumnNums);
  $contentNext: randomChars($perColumnNums);
  $delay: random($n);
  $randomAnimationTine: #{$animationTime + calc(random(20) / 10 - 1)}s;
  p:nth-child(#{$i})::before {
    content: $content;
    color: #000;
    // text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 5px currentColor, 0 0 10px currentColor;
    animation: typing-#{$i} $randomAnimationTine steps(20, end) #{$delay * 0.1s * -1} infinite;
    z-index: 1;
  }
  p:nth-child(#{$i})::after {
    $alpha: calc(random(40) / 100 + 0.6);
    content: "";
    // background: linear-gradient(
    //   rgba(0, 0, 0, $alpha),
    //   rgba(0, 0, 0, $alpha),
    //   rgba(0, 0, 0, $alpha),
    //   transparent 75%,
    //   transparent
    // );
    background-size: 100% 220%;
    background-repeat: no-repeat;
    animation: mask $randomAnimationTine infinite #{($delay - 2) * 0.1s * -1} linear;
    z-index: 2;
  }

  @keyframes typing-#{$i} {
    0% {
      height: 0;
    }
    25% {
      height: 100%;
    }
    100% {
      height: 100%;
      // content: $contentNext;
    }
  }
}

@keyframes mask {
  0% {
    background-position: 0 220%;
  }
  30% {
    background-position: 0 0%;
  }
  100% {
    background-position: 0 0%;
  }
}
</style>
