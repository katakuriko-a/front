// import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ({ app, route, redirect, store }) {

  if(route.path == "/admin"){
    //管理者以外の場合
    if(store.getters.getRolesId !== 99){
      return redirect("/mypage");
    }

  }

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
