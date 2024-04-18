import { createStore } from "vuex";
import axios from "axios";
let url = import.meta.env.VITE_BACKEND_URL;
const store = new createStore({
  state: {
    student: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    students: [],
    status: "",
  },
  getters: {},
  mutations: {
    Add(state, name, phone, email, student) {
      state.students.unshift(student);
      // state.students.push({ name: name, phone: phone, email: email });
    },
    Status(state, status) {
      state.status = status;
    },
    liste(state, students) {
      state.students = students;
    },
    supprimer(state, id) {
      state.students = state.students.filter((student) => student.id !== id);
    },
    edit(state, student) {
      console.log((state.student = student));
    },
  },
  actions: {
    async addaction({ commit }, student) {
      await axios
        .post(url + "/api/student", student)
        .then((response) => {
          console.log(response);
          commit("Add");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sudentListe({ commit }) {
      axios.get(url + "/api/student").then((response) => {
        console.log(response.data);
        commit("liste", response.data);
      });
    },
    deleteField({ commit }, id) {
      console.log(id);
      axios.delete(url + `/api/student/${id}`);
      commit("supprimer", id);
    },
    editField({ commit }, id) {
      console.log(id);
      axios.get(url + "/api/student/" + id).then((response) => {
        console.log(response.data);
        commit("edit", response.data);
      });
    },
    updateField({ commit }, id) {
      axios.put(url + "/api/student" + id);
      commit("Status", "uptaded");
    },
  },
});
export default store;
