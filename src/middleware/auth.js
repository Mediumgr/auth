export default function auth(_, from, next) {
  const loggedIn = !!JSON.parse(localStorage.getItem("user"))?.token;
  if (!loggedIn && from.path === "/register") {
    next("/");
  } else next();
}
