<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const props = defineProps<{
  text: string
  class?: string
}>()

const glitchOffset = ref({ x: 0, y: 0 })
const isGlitching = ref(false)
let glitchInterval: ReturnType<typeof setInterval> | null = null

const triggerGlitch = () => {
  isGlitching.value = true
  glitchOffset.value = {
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 4,
  }

  setTimeout(() => {
    isGlitching.value = false
    glitchOffset.value = { x: 0, y: 0 }
  }, 100)
}

onMounted(() => {
  glitchInterval = setInterval(() => {
    if (Math.random() > 0.7) {
      triggerGlitch()
    }
  }, 2000)
})

onUnmounted(() => {
  if (glitchInterval) {
    clearInterval(glitchInterval)
  }
})
</script>

<template>
  <div class="glitch-text-wrapper" :class="props.class">
    <!-- Main text -->
    <span
      class="main-text"
      :style="{
        transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
        transition: isGlitching ? 'none' : 'transform 0.1s ease-out',
      }"
    >
      {{ text }}
    </span>

    <!-- Glitch layers -->
    <span
      class="glitch-layer glitch-layer-1"
      :style="{
        transform: `translate(${isGlitching ? -3 : 0}px, ${isGlitching ? 2 : 0}px)`,
        clipPath: isGlitching ? 'inset(10% 0 80% 0)' : 'none',
        opacity: isGlitching ? 1 : 0,
      }"
      aria-hidden="true"
    >
      {{ text }}
    </span>

    <span
      class="glitch-layer glitch-layer-2"
      :style="{
        transform: `translate(${isGlitching ? 3 : 0}px, ${isGlitching ? -2 : 0}px)`,
        clipPath: isGlitching ? 'inset(60% 0 20% 0)' : 'none',
        opacity: isGlitching ? 1 : 0,
      }"
      aria-hidden="true"
    >
      {{ text }}
    </span>

    <!-- Scan line effect -->
    <div v-if="isGlitching" class="scan-line" />
  </div>
</template>

<style lang="scss" scoped>
.glitch-text-wrapper {
  position: relative;
  display: inline-block;
  user-select: none;
}

.main-text {
  position: relative;
  z-index: 10;
  background: linear-gradient(
    135deg,
    hsl(var(--color-primary)) 0%,
    hsl(var(--color-accent)) 50%,
    hsl(var(--color-primary)) 100%
  );
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glitch-layer {
  position: absolute;
  inset: 0;

  &.glitch-layer-1 {
    color: hsl(var(--color-primary) / 0.6);
  }

  &.glitch-layer-2 {
    color: hsl(var(--color-accent) / 0.6);
  }
}

.scan-line {
  position: absolute;
  inset: 0;
  top: 50%;
  height: 2px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: pulse 0.1s ease;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
