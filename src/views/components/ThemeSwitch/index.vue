<template>
  <label class="switch">
    <input type="checkbox" v-model="themecolor" :checked="themecolor" />
    <span class="slider"></span>
  </label>
</template>

<script>
import { setTheme } from "@/utils/common";
import { useState } from "@/utils/hooks/useMapper";
import { computed, defineComponent, onBeforeUnmount, onMounted, toRefs } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "ThemeSwitch",
  components: {},
  computed: {},
  props: {},
  setup(props, { attrs, emit, expose, slots }) {
    const { state, dispatch, commit } = useStore();
    const { appearance } = useState({
      appearance: (state) => state.settings.appearance,
    });
    const themecolor = computed({
      get() {
        let theme = appearance.value == "dark" ? true : false;
        return theme;
      },
      set(val) {
        let theme = val ? "dark" : "light";
        ThemeColorChange(theme);
      },
    });

    const ThemeColorChange = (val) => {
      commit("UPDATE_USER_SETUP", {
        key: "appearance",
        value: val,
      });
      setTheme(val);
    };
    onMounted(() => {});
    onBeforeUnmount(() => {});
    return {
      appearance,
      themecolor,
      ThemeColorChange,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
/* From www.lingdaima.com */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
  zoom: 0.7;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f4f4f5;
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.3em;
  bottom: 0.3em;
  background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #303136;
}

input:checked + .slider:before {
  transform: translateX(1.5em);
  background: #303136;
  box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -5px 0 0 #a3dafb;
}
</style>
