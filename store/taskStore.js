import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      const sum = this.tasks.reduce((accumulator, currentValue) => {
        return currentValue.isFav ? accumulator + 1 : accumulator;
      }, 0); //initilize accumulator to 0;
      return sum;
    },
    totalCount() {
      return this.tasks.length;
    },
  },
  actions: {
    async addTask(task) {
      this.tasks.push(task);
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "content-type": "application/json" },
      });
      if (res.error) {
        console.log(error);
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });
      if (res.error) {
        console.log(error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => {
        return t.id === id;
      });
      task.isFav = !task.isFav;
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(error);
      }
    },
    async getTasks() {
      this.loading = true;
      const data = await fetch("http://localhost:3000/tasks");
      // console.log(data.json());
      this.tasks = await data.json();
      this.loading = false;
      // console.log(this.tasks);
    },
  },
});
