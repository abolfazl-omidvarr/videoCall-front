import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx",{id:'home-route'}),
  route("/api/getToken", "routes/api/getToken.tsx"),
] satisfies RouteConfig;
