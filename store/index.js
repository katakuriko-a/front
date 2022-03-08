import axios from "axios";

export const state = () => ({
  students: [],
  student: {},
  teachers: [],
  progress: [],
  current_student_id:"",
  current_student_name:"小林",
  post: [],
  levels: [],
  isStudents: false, //データが存在するかどうか
  isTeachers: false, //データが存在するかどうか
  isOpen: null, //詳細検索
  isShow: false, //グレー背景
  isPopup: false, //csvポップアップ
  isProgress: false,
  isDrawer: false,
  isTheme: false,
  //認証機能関連state
  user: null,
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
  setTeachers(state, teachers) {
    state.teachers = teachers;
    if (teachers.length == 0) {
      state.isTeachers = true;
    } else {
      state.isTeachers = false;
    }
  },

  setStudent(state, student) {
    state.student = student;
  },

  //生徒の新規追加
  newStudent(state, student) {
    state.students.push(student);
    state.student = student;
  },

  newProgress(state, post) {
    state.progress.push(post);
    state.post = post;
  },

  setFilter(state) {
    state.isOpen = !state.isOpen;
    state.isShow = !state.isShow;
  },

  setClose(state) {
    state.isOpen = false;
    state.isShow = false;
    state.isPopup = false;
    state.isDrawer = false;
  },

  setCsv(state) {
    state.isPopup = true;
    state.isShow = true;
  },

  setProgress(state, progress) {
    state.progress = progress;
    if (progress.length == 0) {
      state.isProgress = true;
    } else {
      state.isProgress = false;
    }
  },

  setPost(state, post) {
    state.post = post;
    console.log(post);
  },
  setDrawer(state) {
    state.isDrawer = !state.isDrawer;
    state.isShow = !state.isShow;
  },
  setTheme(state) {
    state.isTheme = !state.isTheme;
  },
  falseTheme(state) {
    state.isTheme = false;
  },

  //認証機能関連mutation
  setUser(state, user) {
    state.user = user;
  },

  setLevels(state, levels) {
    state.levels = levels;
  },
  setCurrentStudentId(state, current_student_id){
    state.current_student_id = current_student_id;
    console.log(state.current_student_id);
  },
  setCurrentStudentName(state, current_student_name){
    state.current_student_name = current_student_name;
    console.log(state.current_student_name);
  },
};

export const actions = {

  async getCurrentStudentId({ commit }, mail) {
    const res = await axios.get(`http://localhost/api/current_student`,{
      params: {
        mail: mail,
      },
    });
    commit("setCurrentStudentId", res.data);
    console.log(res.data);
  },

  async getCurrentStudentName({ commit, state }) {
    const res = await axios.get(`http://localhost/api/current_student_name`,{
      params: {
        id: state.current_student_id,
      },
    });
    commit("setCurrentStudentName", res.data);
    console.log(res.data);
  },

  async getProgress({ commit }, id) {
    const res = await axios.get(`http://localhost/api/progress/${id}`);
    commit("setProgress", res.data);
  },
  async getLevels({ commit }) {
    const res = await axios.get(`http://localhost/api/level`);
    commit("setLevels", res.data);
    console.log("セットレベル");
    console.log(res.data);
  },

  async addProgress({ commit }, { id, title, content }) {
    const request = {
      title: title,
      content: content,
    };
    const res = await axios.post(
      `http://localhost/api/progress/${id}/store`,
      request
    );
    this.$router.push(`/progress/${id}`);
  },

  async getPost({ commit }, id) {
    const res = await axios.get(`http://localhost/api/progress/${id}/edit`);
    commit("setPost", res.data);
  },

  async updatePost({ commit }, { id, student_id, title, content }) {
    const request = {
      title: title,
      content: content,
    };
    const res = await axios.post(
      `http://localhost/api/progress/${id}/update`,
      request
    );
    console.log(res.data);
    this.$router.push(`/progress/${student_id}`);
    commit("setPost", res.data);
  },

  async deleteProgress({ commit }, id) {
    if (!confirm("本当に削除しますか？")) {
      return;
    }
    await axios
      .delete(`http://localhost/api/progress/${id}/destroy`)
      .then(() => {
        location.reload();
      });
  },

  async getStudents({ commit }) {
    const res = await axios.get("http://localhost/api");
    commit("setStudents", res.data);
  },

  async getTeachers({ commit }) {
    const res = await axios.get("http://localhost/api/teachers");
    commit("setTeachers", res.data);
  },

  async getStudent({ commit }, id) {
    const res = await axios.get(`http://localhost/api/edit/${id}`);
    commit("setStudent", res.data);
  },

  async updateStudent(
    { commit },
    { id, name, age, birth, mail, tel, plan, level }
  ) {
    const request = {
      name: name,
      age: age,
      birth: birth,
      mail: mail,
      tel: tel,
      plan: plan,
      level: level,
    };
    const res = await axios.post(`http://localhost/api/update/${id}`, request);
    console.log(res.data);
    this.$router.push("/students");
  },

  async addStudent({ commit }, { name, age, birth, mail, tel, plan, level }) {
    const request = {
      name: name,
      age: age,
      birth: birth,
      mail: mail,
      tel: tel,
      plan: plan,
      level: level,
    };
    const res = await axios.post("http://localhost/api/store", request);
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
    if (!confirm("本当に削除しますか？")) {
      return;
    }
    await axios.delete(`http://localhost/api/destroy/${id}`).then(() => {
      location.reload();
    });
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

  drawer({ commit }) {
    commit("setDrawer");
  },

  toggleFilter({ commit }) {
    commit("setFilter");
  },

  close({ commit }) {
    commit("setClose");
  },
  theme({ commit }) {
    commit("setTheme");
  },
  // 予約関連
  async book({ commit }, { current_student_id, teacher_id, start_time, end_time }) {
    const request = {
      current_student_id: current_student_id,
      teacher_id: teacher_id,
      start_time: start_time,
      end_time: end_time,
    };
    await axios.post("http://localhost/api/book", request);
    // commit("addBook", res.data);
    this.$router.push("/teachers");
  },

  //認証機能関連action
  login(state, info) {
    const { password, email } = info;
    state.commit("setUser", {
      password,
      email,
    });
  },
  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      // authされていない場合
      state.commit("setUser", null);
      // リダイレクトの設定
      this.$router.push({
        path: "/auth",
      });
    } else {
      // authされている場合
      const { uid, email } = authUser;
      state.commit("setUser", {
        uid,
        email,
      });
    }
  },
  logout(state) {
    state.commit("setUser", null);
    state.commit("falseTheme");
    $nuxt.$fire.auth.signOut().then(() => {
      $nuxt.$router.push("/auth");
    });
  },
};
const getters = {
  getUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
