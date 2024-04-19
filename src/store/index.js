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
    Add(state, name, phone, email) {
      // state.students.unshift(student);

      state.students.push({ name: name, phone: phone, email: email });
    },
    Update(state, student) {
      state.student = student;
    },
    liste(state, students) {
      state.students = students;
    },
    supprimer(state, id) {
      state.students = state.students.filter((student) => student.id !== id);
    },
    edit(state, student) {
      state.student = student;
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
      axios.get(url + "/api/student/" + id).then((response) => {
        commit("edit", response.data);
      });
    },
    updateField({ commit }, student) {
      axios.put(url + "/api/student/" + student.id, student);
      commit("Update", student);
    },
  },
});
export default store;
