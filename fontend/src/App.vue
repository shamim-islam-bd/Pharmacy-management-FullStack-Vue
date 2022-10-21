<template>
  <div id="app">
    <router-view></router-view>
    <!-- <div class="toasts"> -->
    <TransitionGroup name="slide-left" tag="div" class="toasts">
      <Toast
        v-for="(toast, index) in toasts"
        :key="index"
        :message="toast.message"
        :type="toast.type"
      ></Toast>
    </TransitionGroup>
    <!-- </div> -->
  </div>
</template>

<script>
import Toast from "./components/Toast.vue";
import { eventBus } from "./utils/eventBus";
// import Login from "./view/Login.vue";
export default {
  components: {
    // Login,
    Toast,
  },

  data: () => ({
    toasts: [
      // {
      //   type: "Success",
      //   message: "Sucessfully Logged In",
      // },
      // {
      //   type: "Error",
      //   message: "Something went wrong",
      // },
    ],
  }),

  mounted() {
    eventBus.on("Toast", (data) => {
      // console.log(data);
      this.toasts.push(data);
      this.removeOneToast();
    });
  },

  methods: {
    removeOneToast() {
      setTimeout(() => {
        this.toasts.shift();
      }, 2222);
    },
  },
};
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.4s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
