import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: () => ({
    message: "",
    status: "",
    alert: false,
  }),
  actions: {
    popup(message, status) {
      this.message = message;
      this.status = status;
      this.alert = true;

      setTimeout(() => {
        this.clear();
      }, 3000);
    },
    clear() {
      this.message = "";
      this.status = "";
      this.alert = false;
    },
  },
});
