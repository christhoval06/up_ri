const seed = {
  "chisthoval@icloud.com": {
    password: "12345678",
    name: "Christhoval Barba",
    email: "chisthoval@icloud.com"
  }
};

let authDB = seed;

const prevAuthDB = localStorage.getItem("@authDB");
if (prevAuthDB) {
  authDB = JSON.parse(prevAuthDB);
}

localStorage.setItem("@authDB", JSON.stringify(authDB));

export default {
  db: authDB,
  add(data) {
    delete data.password2;
    authDB[data.email] = data;
    localStorage.setItem("@authDB", JSON.stringify(authDB));
    return data;
  },
  addAndLogin(data) {
    data = this.add(data);
    this.user(data);
  },
  user(data) {
    localStorage.setItem("@authUser", JSON.stringify(data));
  },
  logout() {
    localStorage.removeItem("@authUser");
  },
  session() {
    const authUser = localStorage.getItem("@authUser");
    if (authUser) {
      return JSON.parse(authUser);
    }
    return null;
  },
  save(subjects) {
    const user = { ...this.session(), subjects, inCurse: true };
    this.add(user);
    this.user(user);
  }
};
