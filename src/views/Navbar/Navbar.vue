<template>
  <div>
    <nav>
      <div class="navigation-buttons">
        <ButtonIcon @click.native="go('back')">
          <svg-icon icon-class="arrow-left" />
        </ButtonIcon>
        <ButtonIcon @click.native="go('forward')">
          <svg-icon icon-class="arrow-right" />
        </ButtonIcon>
      </div>

      <div class="navigation-links">
        <router-link to="/home" :class="{ active: CurrentRoute === 'home' }">{{ t('nav.home') }}</router-link>
        <router-link to="/explore" :class="{ active: CurrentRoute === 'explore' }">{{ t('nav.explore') }}</router-link>
        <router-link to="/library" :class="{ active: CurrentRoute === 'library' }">{{ t('nav.library') }}</router-link>
      </div>

      <div class="right-part">
        <div class="search-box">
          <div class="container" :class="{ active: state.inputFocus }">
            <svg-icon icon-class="search" />
            <div class="input">
              <input ref="searchInput" v-model="state.keywords" type="search"
                :placeholder="state.inputFocus ? '' : t('nav.search')" @keydown.enter="doSearch"
                @focus="state.inputFocus = true" @blur="state.inputFocus = false" />
            </div>
          </div>
        </div>
        <el-avatar class="avatar" :size="30" :src="avatarUrl" @click.native="showUserProfileMenu" />
      </div>
    </nav>
    <ContextMenu ref="userProfileMenu">
      <div class="item" @click="toSettings">
        <svg-icon icon-class="settings" />
        {{ t('library.userProfileMenu.settings') }}
      </div>
      <div v-if="!state.isLooseLoggedIn" class="item" @click="toLogin">
        <svg-icon icon-class="login" />
        {{ t('login.login') }}
      </div>
      <div v-if="state.isLooseLoggedIn" class="item" @click="logout">
        <svg-icon icon-class="logout" />
        {{ t('library.userProfileMenu.logout') }}
      </div>
    </ContextMenu>
  </div>
</template>

<script setup>
  import { onMounted, ref, reactive, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useI18n } from 'vue-i18n'
  import store from '@/store'

  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()
  const userProfileMenu = ref(null)

  onMounted(() => {

  })

  const showUserProfileMenu = (e) => {
    userProfileMenu.value.openMenu(e)
  }


  const state = reactive({
    inputFocus: false,
    keywords: '',
    isLooseLoggedIn: false,
  })

  const avatarUrl = computed(() => {
    return 'http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60'
  })

  const CurrentRoute = computed(() => {
    return route.name
  })

  const go = (where) => {
    if (where === 'back') router.go(-1)
    else router.go(1)
  }

  const doSearch = (e) => {}

  const logout = () => {}

  const toSettings = () => {}

  const toLogin = () => {}
</script>

<style lang="scss" scoped>
  .item {
    font-weight: 600;
    font-size: 14px;
    padding: 10px 14px;
    border-radius: 7px;
    cursor: default;
    color: var(--color-text);
    display: flex;
    align-items: center;

    &:hover {
      color: var(--color-primary);
      background: var(--color-primary-bg-for-transparent);
    }

    .svg-icon {
      height: 16px;
      width: 16px;
      margin-right: 5px;
    }
  }

  nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;

    padding: {
      right: 10vw;
      left: 10vw;
    }

    backdrop-filter: saturate(180%) blur(20px);

    background-color: var(--color-navbar-bg);
    z-index: 100;
    -webkit-app-region: drag;
  }

  @media (max-width: 1336px) {
    nav {
      padding: 0 5vw;
    }
  }

  @supports (-moz-appearance: none) {
    nav {
      background-color: var(--color-body-bg);
    }
  }




  .navigation-buttons {
    flex: 1;
    display: flex;
    align-items: center;

    .svg-icon {
      height: 24px;
      width: 24px;
    }

    button {
      -webkit-app-region: no-drag;
    }
  }

  @media (max-width: 970px) {
    .navigation-buttons {
      flex: unset;
    }
  }

  .navigation-links {
    flex: 1;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    user-select: none;

    a {
      -webkit-app-region: no-drag;
      font-size: 18px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 6px;
      padding: 6px 10px;
      color: var(--color-text);
      transition: 0.2s;
      -webkit-user-drag: none;

      margin: {
        right: 12px;
        left: 12px;
      }

      &:hover {
        background: var(--color-secondary-bg-for-transparent);
      }

      &:active {
        transform: scale(0.92);
        transition: 0.2s;
      }
    }

    a.active {
      color: var(--color-primary);
    }
  }

  .search {
    .svg-icon {
      height: 18px;
      width: 18px;
    }
  }

  .search-box {
    display: flex;
    justify-content: flex-end;
    -webkit-app-region: no-drag;

    .container {
      display: flex;
      align-items: center;
      height: 32px;
      background: var(--color-secondary-bg-for-transparent);
      border-radius: 8px;
      width: 200px;
    }

    .svg-icon {
      height: 15px;
      width: 15px;
      color: var(--color-text);
      opacity: 0.28;

      margin: {
        left: 8px;
        right: 4px;
      }
    }

    input {
      font-size: 16px;
      border: none;
      background: transparent;
      width: 96%;
      font-weight: 600;
      margin-top: -1px;
      color: var(--color-text);
    }

    .active {
      background: var(--color-primary-bg-for-transparent);

      input,
      .svg-icon {
        opacity: 1;
        color: var(--color-primary);
      }
    }
  }

  [data-theme='dark'] {
    .search-box {
      .active {

        input,
        .svg-icon {
          color: var(--color-text);
        }
      }
    }
  }

  .right-part {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .avatar {
      user-select: none;
      // height: 30px;
      margin-left: 12px;
      vertical-align: -7px;
      border-radius: 50%;
      cursor: pointer;
      -webkit-app-region: no-drag;
      -webkit-user-drag: none;

      &:hover {
        filter: brightness(80%);
      }
    }

    .search-button {
      display: none;
      -webkit-app-region: no-drag;
    }
  }
</style>