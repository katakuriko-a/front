import axios from "axios";

export const state = () => ({
  students: [],
  isStudents: false, //データが存在するかどうか
  isOpen: false, //詳細検索
  isShow: false, //グレー背景
  isPopup: false, //csvポップアップ
});

export const mutations = {
  setStudents(state, students) {
    state.students = students;
    if (students.length == 0) {
      state.isStudents = true;
    } else {
      state.isStudents = false;
    }
  },

  //生徒の新規追加
  newStudent(state, student) {
    state.students.push(student);
  },

  setFilter(state) {
    state.isOpen = !state.isOpen;
    state.isShow = !state.isShow;
  },

  setClose(state) {
    state.isOpen = false;
    state.isShow = false;
    state.isPopup = false;
  },

  setCsv(state) {
    state.isPopup = true;
    state.isShow = true;
  },
};

export const actions = {
  async getStudents({ commit }) {
    const res = await axios.get("http://localhost/api");
    commit("setStudents", res.data);
  },

  async addStudent({ commit }, { name, age, birth, mail, tel, plan }) {
    const param = {
      name: name,
      age: age,
      birth: birth,
      mail: mail,
      tel: tel,
      plan: plan,
    };
    const res = await axios.post("http://localhost/api/store", param);
    commit("newStudent", res.data);
    this.$router.push("/students");
  },

  async searchStudents({ commit }, search) {
    const res = await axios.get("http://localhost/api", {
      params: {
        search: search,
      },
    });
    commit("setStudents", res.data);
  },

  async deleteStudents({ commit }, id) {
    const res = await axios
      .delete(`http://localhost/api/destroy/${id}`)
      .then(() => {
        location.reload();
      });
    commit("setStudents", res.data);
  },

  async getCsv({ commit }, filename) {
    await axios
      .get("http://localhost/api/csv", {
        responseType: "blob",
      })
      .then((res) => {
        const url = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
      });
    commit("setClose");
  },

  async filterStudents({ commit }, { name, age, birth, mail, tel, plan }) {
    const res = await axios.get("http://localhost/api", {
      params: {
        name: name,
        age: age,
        birth: birth,
        mail: mail,
        tel: tel,
        plan: plan,
      },
    });
    commit("setStudents", res.data);
    commit("setClose");
    console.log(res.data);
  },

  popupOpen({ commit }) {
    commit("setCsv");
  },

  toggleFilter({ commit }) {
    commit("setFilter");
  },

  close({ commit }) {
    commit("setClose");
  },
};
