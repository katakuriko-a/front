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
    console.log("roles_idガセットされました");
    console.log(roles);
  },
  setPage(state, page) {
    state.page = page;
    this.$router.push(`/students/${state.current_student_id}/mypage`);
  },
  setUsers(state, students) {
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

  setUser(state, student) {
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
  newUser(state, student) {
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
  /**
   *現在ログイン中のユーザーidをstateの保存
   * @param {string} mail ユーザーのメールアドレス
   */
  async getCurrentUserId({ commit }, mail) {
    const res = await axios.get(`http://localhost/api/current_user`, {
      params: {
        mail: mail,
      },
    });
    commit("setCurrentStudentId", res.data);
  },

  /**
   *特定の進捗情報を取得
   *
   * @param {integer} id 進捗情報のid
   */
  async getProgress({ commit }, id) {
    const res = await axios.get(`http://localhost/api/progress/${id}`);
    commit("setProgress", res.data);
  },

  /**
   *進捗情報の新規登録
   *
   * @param {integer} id 生徒のid
   * @param {object} request 進捗情報
   */
  async addProgress({ commit }, { id, title, content }) {
    const request = {
      title: title,
      content: content,
    };
    await axios.post(`http://localhost/api/progress/${id}/store`, request);
    this.$router.push(`/progress/${id}`);
  },

  /**
   *更新する進捗情報の取得
   *
   * @param {integer} id 進捗情報のid
   */
  async getPost({ commit }, id) {
    const res = await axios.get(`http://localhost/api/progress/${id}/edit`);
    commit("setPost", res.data);
  },

  /**
   *進捗情報の更新
   *
   * @param {object} request 入力された進捗情報
   */
  async updatePost({ commit }, { id, user_id, title, content }) {
    const request = {
      title: title,
      content: content,
    };
    const res = await axios.post(
      `http://localhost/api/progress/${id}/update`,
      request
    );
    this.$router.push(`/progress/${user_id}`);
    commit("setPost", res.data);
  },

  /**
   *更新する進捗情報の削除
   *
   * @param {integer} id 進捗情報のid
   */
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

  /**
   *ユーザー一覧の取得
   */
  async getUsers({ commit }) {
    const res = await axios.get("http://localhost/api");
    commit("setUsers", res.data);
  },

  /**
   *生徒一覧の取得
   */
  async getStudents({ commit }) {
    const res = await axios.get("http://localhost/api/get_students");
    commit("setUsers", res.data);
  },

  /**
   * 先生一覧の取得
   */
  async getTeachers({ commit }) {
    const res = await axios.get("http://localhost/api/teachers");
    commit("setTeachers", res.data);
  },

  /**
   * 編集したいユーザーの取得
   */
  async getUser({ commit }, id) {
    const res = await axios.get(`http://localhost/api/edit/${id}`);
    commit("setUser", res.data);
    console.log("getUser");
    console.log(res);
  },

  /**
   * メールから権限の登録
   *
   *@param {string} mail メールアドレス
   */
  async getUserWithEmail({ commit }, mail) {
    const request = {
      mail: mail,
    };
    const res = await axios.post(
      `http://localhost/api/get/user/with_email`,
      request
    );
    commit("setRolesId", res.data.roles_id);
  },

  /**
   * 予約情報の取得(生徒ページ)
   *
   * @param {integer} id 生徒のid
   */
  async getTeacher({ commit }, id) {
    const res = await axios.get(`http://localhost/api/reserve/${id}`);
    commit("setTeacher", res.data);
  },

  /**
   * ユーザー情報の更新
   * @param {object} request ユーザー情報
   */
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

  /**
   * ユーザー新規登録
   * @param {object} request ユーザー情報
   */
  async addUser(
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
    commit("newUser", res.data);
  },

  /**
   * ユーザーの詳細検索
   * @param {object} seach 検索情報
   */
  async searchStudents({ commit }, search) {
    const res = await axios.get("http://localhost/api", {
      params: {
        search: search,
      },
    });
    commit("setUsers", res.data);
  },

  /**
   * ユーザーの削除
   * @param {integer} id ユーザーのid
   */
  async deleteUsers({ commit }, id) {
    if (!confirm("本当に削除しますか？")) {
      return;
    }
    await axios.delete(`http://localhost/api/destroy/${id}`).then(() => {
      location.reload();
    });
  },

  /**
   * 予約情報の削除
   * @param {integer} id 予約情報のid
   */
  async deleteReserve({ commit }, id) {
    if (!confirm("本当にキャンセルしますか？")) {
      return;
    }
    await axios.post(`http://localhost/api/reserve/${id}/destroy`).then(() => {
      location.reload();
    });
  },

  /**
   * 編集したい予約情報の取得
   * @param {integer} student_id 生徒のid
   */
  async getReserve({ commit }, { id, student_id }) {
    console.log(id, student_id);
    const request = {
      student_id: student_id,
    };
    const res = await axios.post(
      `http://localhost/api/reserve/${id}/edit`,
      request
    );
    commit("setReserve", res.data);
    this.$router.push(`/reserves/${id}/edit`);
  },

  /**
   * ユーザー情報をcsv形式で保存
   *
   * @param {string} filename ファイル名
   */
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

  /**
   * ユーザーの詳細検索
   * @param {object} params 検索情報
   */
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
    commit("setUsers", res.data);
    commit("setClose");
  },

  /**
   * csv保存時の名前入力ポップアップを表示
   */
  popupOpen({ commit }) {
    commit("setCsv");
  },

  // drawer({ commit }) {
  //   commit("setDrawer");
  // },

  /**
   * 詳細検索ドロワー表示
   */
  toggleFilter({ commit }) {
    commit("setFilter");
  },

  /**
   * ポップアップ等を閉じる
   */
  close({ commit }) {
    commit("setClose");
  },

  /**
   * カラーテーマの状態管理
   */
  theme({ commit }) {
    commit("setTheme");
  },

  /**
   * 新規予約
   *
   * @param {object} request 予約情報
   */
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

  /**
   * 予約情報の更新
   *
   * @param {object} request 予約情報
   */
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
    this.$router.push(`/mypage`);
  },

  /**
   * 予約情報の取得(生徒ページ)
   *
   * @param {integer} id 生徒のid
   */
  async getReservedTeachers({ commit }, id) {
    const res = await axios.get(`http://localhost/api/get_reserve/${id}`);
    commit("setReservedTeachers", res.data);
  },

  /**
   * 予約情報の取得(先生ページ)
   *
   * @param {integer} id 先生のid
   */
  async getReservedStudents({ commit }, id) {
    const res = await axios.get(
      `http://localhost/api/get_reserve_students/${id}`
    );
    commit("setReservedTeachers", res.data);
    console.log("getReserve_生徒");
    console.log(res.data);
  },

  /**
   * ログイン処理
   *
   * @param {object} info ログイン時のメールアドレスとパスワード
   */
  login(state, info) {
    const { password, email } = info;
    state.commit("setUser", {
      password,
      email,
    });
  },

/**
 * ログインに成功したときと失敗したときで処理を分ける
 *
 * @param { boolean } authUser ログイン成功フラグ
 */
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

  /**
   * ログアウトの処理
   */
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
