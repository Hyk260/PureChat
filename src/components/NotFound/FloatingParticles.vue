<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

const particles = ref<Particle[]>([])
let animationId: number | null = null

const createParticles = () => {
  const count = 20
  const newParticles: Particle[] = []

  for (let i = 0; i < count; i++) {
    newParticles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    })
  }

  particles.value = newParticles
}

const animate = () => {
  particles.value = particles.value.map((p) => {
    let newX = p.x + p.speedX
    let newY = p.y + p.speedY

    // Wrap around edges
    if (newX < -5) newX = 105
    if (newX > 105) newX = -5
    if (newY < -5) newY = 105
    if (newY > 105) newY = -5

    return {
      ...p,
      x: newX,
      y: newY,
      rotation: p.rotation + p.rotationSpeed,
    }
  })

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  createParticles()
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <div class="particles-container">
    <!-- Geometric shapes -->
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        opacity: particle.opacity,
        transform: `rotate(${particle.rotation}deg)`,
      }"
    >
      <!-- Alternating shapes -->
      <div v-if="particle.id % 3 === 0" class="shape shape-circle" />
      <div v-else-if="particle.id % 3 === 1" class="shape shape-square" />
      <div v-else class="shape shape-triangle" />
    </div>

    <!-- Larger decorative elements -->
    <div class="decorator decorator-1" />
    <div class="decorator decorator-2" />
    <div class="decorator decorator-3" />
    <div class="decorator decorator-4" />
  </div>
</template>

<style lang="scss" scoped>
.particles-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
}

.shape {
  width: 100%;
  height: 100%;

  &.shape-circle {
    border-radius: 50%;
    background-color: hsl(var(--color-primary) / 0.4);
  }

  &.shape-square {
    background-color: hsl(var(--color-accent) / 0.3);
    transform: rotate(45deg);
  }

  &.shape-triangle {
    border: 1px solid hsl(var(--color-primary) / 0.3);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
}

.decorator {
  position: absolute;

  &.decorator-1 {
    top: 80px;
    left: 40px;
    width: 64px;
    height: 64px;
    border: 2px solid hsl(var(--color-primary) / 0.1);
    border-radius: 12px;
    animation: float 6s ease-in-out infinite;
  }

  &.decorator-2 {
    bottom: 128px;
    right: 80px;
    width: 48px;
    height: 48px;
    background-color: hsl(var(--color-accent) / 0.1);
    border-radius: 8px;
    animation: float 6s ease-in-out 2s infinite;
  }

  &.decorator-3 {
    top: 33%;
    right: 40px;
    width: 32px;
    height: 32px;
    border: 1px solid hsl(var(--color-secondary));
    border-radius: 50%;
    animation: bounce-slow 3s infinite;
  }

  &.decorator-4 {
    bottom: 80px;
    left: 25%;
    width: 40px;
    height: 40px;
    border: 1px solid hsl(var(--color-primary) / 0.2);
    transform: rotate(45deg);
    animation: float 6s ease-in-out infinite;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25%);
  }
}
</style>
