import { ref, watchEffect } from "vue";
// import { useDark, useToggle } from '@vueuse/core'
import store from "@/store";

export function useDataThemeChange() {
  const theme = ref("light");

  const setTheme = (value) => {
    theme.value = value;
    // 设置自定义主题色
    document.body.setAttribute("data-theme", value);
    // 设置element主题色
    if (value == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // 更新store状态 页面刷新不丢失
    store.commit("updateSettings", {
      key: "appearance",
      value: value,
    });
  };

  const toggleTheme = () => {
    // const theme = theme.value === "light" ? "dark" : "light";
    // setTheme(theme);
    // theme.value = theme;
  };

  const initTheme = () => {
    // const prefersDark = window.matchMedia(
    //   "(prefers-color-scheme: dark)"
    // ).matches;
    // setTheme(prefersDark ? "dark" : "light");
    // theme.value = prefersDark ? "dark" : "light";
  };

  // initTheme();
  watchEffect(() => {
    // window
    //   .matchMedia("(prefers-color-scheme: dark)")
    //   .addEventListener("change", initTheme);
  });

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}

// export function useDataThemeChange() {
//   const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//   const theme = ref(isDark ? "dark" : "light");

//   const setTheme = (newTheme) => {
//     console.log(newTheme);
//     theme.value = newTheme;
//     document.body.setAttribute("data-theme", newTheme);
//   };

//   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//   watchEffect(() => {
//     if (mediaQuery.matches && theme.value !== "dark") {
//       setTheme("dark");
//     } else if (!mediaQuery.matches && theme.value !== "light") {
//       setTheme("light");
//     }
//   });

//   return {
//     theme,
//     setTheme,
//   };
// }
