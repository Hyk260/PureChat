<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { Home, ArrowLeft, Search, Compass, RefreshCw } from "lucide-vue-next"
import FloatingParticles from "@/components/NotFound/FloatingParticles.vue"
import GlitchText from "@/components/NotFound/GlitchText.vue"
import "@/styles/not-found.css"

const route = useRoute()
const isLoaded = ref(false)
const mousePosition = ref({ x: 0, y: 0 })

const attemptedPath = computed(() => route.fullPath)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mousePosition.value = {
    x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
    y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
  }
}

const quickLinks = [
  { name: "返回首页", path: "/", icon: Home },
  { name: "搜索内容", path: "/", icon: Search },
  { name: "浏览导航", path: "/", icon: Compass },
]
</script>

<template>
  <main class="not-found-page" @mousemove="handleMouseMove">
    <!-- Animated Background -->
    <div class="background-container">
      <!-- Gradient Orbs -->
      <div
        class="gradient-orb orb-1"
        :style="{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }"
      />
      <div
        class="gradient-orb orb-2"
        :style="{ transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)` }"
      />
      <div class="gradient-orb orb-3" />

      <!-- Grid Pattern -->
      <div class="grid-pattern" />

      <!-- Floating Particles -->
      <FloatingParticles />
    </div>

    <!-- Main Content -->
    <div class="content-wrapper">
      <div class="content-inner" :class="{ 'is-loaded': isLoaded }">
        <!-- 404 Number with Glitch Effect -->
        <div class="error-number-wrapper">
          <GlitchText text="404" class="error-number" />

          <!-- Decorative Elements around 404 -->
          <div class="decorative-circle circle-1" />
          <div class="decorative-circle circle-2" />
        </div>

        <!-- Message Section -->
        <div class="message-section" :class="{ 'is-loaded': isLoaded }">
          <h1 class="error-title">哎呀！页面走丢了</h1>
          <p class="error-description">您访问的页面似乎不存在，可能已被移动或删除。</p>

          <!-- Attempted Path Display -->
          <div class="path-display">
            <span class="path-label">路径:</span>
            <code class="path-value">{{ attemptedPath }}</code>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons" :class="{ 'is-loaded': isLoaded }">
          <RouterLink to="/" class="btn btn-primary">
            <Home class="btn-icon" />
            返回首页
            <!-- <ArrowLeft class="btn-icon arrow-icon" /> -->
          </RouterLink>

          <button class="btn btn-secondary" @click="$router.go(-1)">
            <RefreshCw class="btn-icon refresh-icon" />
            返回上页
          </button>
        </div>

        <!-- Quick Links -->
        <div v-if="false" class="quick-links-section" :class="{ 'is-loaded': isLoaded }">
          <p class="quick-links-label">或者尝试以下快捷入口</p>
          <div class="quick-links">
            <RouterLink v-for="link in quickLinks" :key="link.name" :to="link.path" class="quick-link">
              <component :is="link.icon" class="quick-link-icon" />
              {{ link.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Decoration -->
    <div class="bottom-decoration" />
  </main>
</template>

<style lang="scss" scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: hsl(var(--color-background));
}

.background-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(48px);
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  &.orb-1 {
    top: 25%;
    left: -128px;
    width: 384px;
    height: 384px;
    background-color: hsl(var(--color-primary) / 0.2);
  }

  &.orb-2 {
    bottom: 25%;
    right: -128px;
    width: 384px;
    height: 384px;
    background-color: hsl(var(--color-accent) / 0.2);
  }

  &.orb-3 {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background-color: hsl(var(--color-secondary) / 0.3);
  }
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 896px;
  margin: 0 auto;
  padding: 48px 24px;
}

.content-inner {
  text-align: center;
  opacity: 0;
  transform: translateY(32px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &.is-loaded {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-number-wrapper {
  position: relative;
  margin-bottom: 32px;
}

.error-number {
  font-size: 12rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;

  @media (min-width: 768px) {
    font-size: 16rem;
  }
}

.decorative-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;

  &.circle-1 {
    width: 288px;
    height: 288px;
    border: 2px dashed hsl(var(--color-primary) / 0.2);
    animation: spin-slow 8s linear infinite;
  }

  &.circle-2 {
    width: 384px;
    height: 384px;
    border: 1px solid hsl(var(--color-accent) / 0.1);
    animation: spin-slow 12s linear infinite reverse;
  }
}

.message-section {
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;

  &.is-loaded {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: hsl(var(--color-foreground));
  text-wrap: balance;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
}

.error-description {
  font-size: 1.125rem;
  color: hsl(var(--color-muted-foreground));
  max-width: 512px;
  margin: 0 auto 16px;
  line-height: 1.625;
}

.path-display {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: hsl(var(--color-secondary) / 0.5);
  font-size: 0.875rem;
  font-family: var(--font-mono);
  color: hsl(var(--color-muted-foreground));
}

.path-label {
  color: hsl(var(--color-primary));
}

.path-value {
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.4s;

  &.is-loaded {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 640px) {
    flex-direction: row;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.btn-primary {
  background-color: hsl(var(--color-primary));
  color: hsl(var(--color-primary-foreground));
  box-shadow: 0 10px 40px hsl(var(--color-primary) / 0.25);

  &:hover {
    box-shadow: 0 15px 50px hsl(var(--color-primary) / 0.3);

    .arrow-icon {
      transform: translateX(-4px);
    }
  }
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: hsl(var(--color-foreground));

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);

    .refresh-icon {
      transform: rotate(180deg);
    }
  }
}

.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.refresh-icon {
  transition: transform 0.5s ease;
}

.quick-links-section {
  padding-top: 32px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.6s;

  &.is-loaded {
    opacity: 1;
    transform: translateY(0);
  }
}

.quick-links-label {
  font-size: 0.875rem;
  color: hsl(var(--color-muted-foreground));
  margin-bottom: 16px;
}

.quick-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.quick-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  background-color: hsl(var(--color-secondary) / 0.5);
  color: hsl(var(--color-secondary-foreground));
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: hsl(var(--color-secondary));
    transform: scale(1.05);
  }
}

.quick-link-icon {
  width: 16px;
  height: 16px;
}

.bottom-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(var(--color-primary) / 0.3), transparent);
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin-slow {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
