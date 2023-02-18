<template>
  <div>
    <p>{{ message }}</p>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import WebSocket from "websocket";

export default defineComponent({
  data() {
    return {
      message: "Hello, world!",
    };
  },

  methods: {
    refresh() {
      const ws = new WebSocket("ws://localhost:3000");

      ws.onopen = () => {
        ws.send("refresh");
      };

      ws.onmessage = event => {
        if (event.data === "reload") {
          if (confirm("The website has been updated. Do you want to reload the page to see the latest content?")) {
            window.location.reload();
          }
        }
      };
    },
  },
});
</script>
