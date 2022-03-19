import axios from "axios";

export const state = () => ({
  students: [],
  student: {},
  teachers: [],
  teacher: {},
  reserved_teachers: [],
  reserved_teacher: {},
  progress: [],
  current_student_id: "",
  current_student_name: "小林",
  post: [],
  levels: [],
  isStudents: false, //データが存在するかどうか
  isTeachers: false, //データが存在するかどうか
  isOpen: null, //詳細検索
  isShow: false, //グレー背景
  isPopup: false, //csvポップアップ
  isProgress: false,
  isDrawer: false,
  isTheme: true,
  //認証機能関連state
  user: null,
  page: "progress",
  roles_id: 99,
});

export const mutations = {
  setRolesId(state, roles) {
    state.roles_id = roles;
    console.log('roles_idガセットされました');
    console.log(roles);
  },
  setPage(state, page) {
    state.page = page;
    this.$router.push(`/students/${state.current_student_id}/mypage`);
  },
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
  setTeacher(state, teacher) {
    state.teacher = teacher;
  },

  setReservedTeachers(state, reservedTeachers) {
    state.reserved_teachers = reservedTeachers;
  },
  setReserve(state, reserved_teacher) {
    state.reserved_teacher = reserved_teacher;
    console.log(reserved_teacher);
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
  setCurrentStudentId(state, current_student_id) {
    state.current_student_id = current_student_id;
    console.log(state.roles_id);
    if (state.roles_id == 99) {
      this.$router.push(`/admin`);
    } else {
      this.$router.push(`/mypage`);
    }
  },
  setCurrentStudentName(state, current_student_name) {
    state.current_student_name = current_student_name;
    console.log(state.current_student_name);
  },
};

export const actions = {
  async getCurrentStudentId({ commit }, mail) {
    const res = await axios.get(`http://localhost/api/current_student`, {
      params: {
        mail: mail,
      },
    });
    commit("setCurrentStudentId", res.data);
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

  async addTeacher(
    { commit },
    { name, age, experience_month, fee, skill, mail, tel, birth }
  ) {
    const request = {
      name: name,
      age: age,
      birth: birth,
      mail: mail,
      tel: tel,
      experience_month: experience_month,
      fee: fee,
      skill: skill,
    };
    await axios
      .post(`http://localhost/api/teachers/store`, request)
      .then(() => {
        this.$router.push(`/teachers`);
      });
  },

  async getPost({ commit }, id) {
    const res = await axios.get(`http://localhost/api/progress/${id}/edit`);
    commit("setPost", res.data);
  },

  async updatePost({ commit }, { id, user_id, title, content }) {
    const request = {
      title: title,
      content: content,
    };
    const res = await axios.post(
      `http://localhost/api/progress/${id}/update`,
      request
    );
    console.log(res.data);
    this.$router.push(`/progress/${user_id}`);
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
    console.log("getStudent");
    console.log(res);
  },

  async getStudentWithEmail({ commit }, mail) {
    const request = {
      mail : mail
    }
    const res = await axios.post(`http://localhost/api/get/student/with_email`, request);
    commit("setRolesId", res.data.roles_id);
  },

  async getTeacher({ commit }, id) {
    const res = await axios.get(`http://localhost/api/reserve/${id}`);
    commit("setTeacher", res.data);
  },

  async updateUser(
    { commit },
    { id, name, age, birth, mail, tel, plan, skill, experience_month, fee }
  ) {
    const request = {
      name: name,
      age: age,
      birth: birth,
      mail: mail,
      tel: tel,
      plan: plan,
      skill: skill,
      experience_month: experience_month,
      fee: fee,
    };
    const res = await axios.post(`http://localhost/api/update/${id}`, request);
    console.log(res.data);
    this.$router.push(`/mypage`);
  },

  async addStudent(
    { commit },
    {
      name,
      age,
      birth,
      mail,
      tel,
      plan,
      roles_id,
      fee,
      experience_month,
      skill,
    }
  ) {
    const request = {
      name: name,
      age: age,
      birth: birth,
      mail: mail,
      tel: tel,
      plan: plan,
      roles_id: roles_id,
      fee: fee,
      experience_month: experience_month,
      skill: skill,
    };
    const res = await axios.post("http://localhost/api/store", request);
    commit("newStudent", res.data);
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

  async deleteReserve({ commit }, id) {
    if (!confirm("本当にキャンセルしますか？")) {
      return;
    }
    await axios.post(`http://localhost/api/reserve/${id}/destroy`).then(() => {
      location.reload();
    });
  },

  async getReserve({ commit }, { id, student_id }) {
    console.log(id, student_id);
    const request = {
      student_id: student_id,
    };
    const res = await axios.post(
      `http://localhost/api/reserve/${id}/edit`,
      request
    );
    console.log("予約情報");
    console.log(res.data);

    commit("setReserve", res.data);
    this.$router.push(`/reserves/${id}/edit`);
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
  async reserve(
    { commit },
    {
      current_student_id,
      teacher_id,
      start_time,
      end_time,
      teacher_name,
      student_name,
    }
  ) {
    const request = {
      current_student_id: current_student_id,
      teacher_name: teacher_name,
      student_name: student_name,
      teacher_id: teacher_id,
      start_time: start_time,
      end_time: end_time,
    };

    await axios.post("http://localhost/api/reserve", request);
    // commit("addBook", res.data);
    this.$router.push("/mypage");
  },

  async updateReserve(
    { commit },
    {
      reserve_id,
      current_student_id,
      teacher_id,
      start_time,
      end_time,
      teacher_name,
    }
  ) {
    const request = {
      reserve_id: reserve_id,
      current_student_id: current_student_id,
      teacher_id: teacher_id,
      start_time: start_time,
      end_time: end_time,
      teacher_name: teacher_name,
    };

    await axios.post("http://localhost/api/reserve/update", request);
    // commit("addBook", res.data);
    this.$router.push(`/mypage`);
  },

  async getReservedTeachers({ commit }, id) {
    const res = await axios.get(`http://localhost/api/get_reserve/${id}`);
    commit("setReservedTeachers", res.data);
    console.log("getReserve");
    console.log(res.data);
  },

  async getReservedStudents({ commit }, id) {
    const res = await axios.get(
      `http://localhost/api/get_reserve_students/${id}`
    );
    commit("setReservedTeachers", res.data);
    console.log("getReserve_生徒");
    console.log(res.data);
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
  getRolesId(state) {
    return state.roles_id;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
