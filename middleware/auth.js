// import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ({ app, route, redirect, store }) {
  
  if (route.path !== "/auth") {
    if (!store.getters.isAuthenticated) {
      return redirect("/auth");
    }

    // ログインページの場合
  } else if (route.path === "/auth") {
    if (store.getters.isAuthenticated) {
      return redirect("/students");
    }
  }
}
