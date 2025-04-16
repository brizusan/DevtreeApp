import LayoutApp from "@/layouts/LayoutApp";
import LayoutAuth from "@/layouts/LayoutAuth";
import ProfileView from "@/views/admin/ProfileView";
import SocialView from "@/views/admin/SocialView";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import HandleView from "@/views/HandleView";
import { HomeView } from "@/views/HomeView";
import NotFoundView from "@/views/NotFoundView";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route element={<LayoutAuth />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        <Route path="/admin" element={<LayoutApp />}>
          <Route index={true} element={<SocialView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>

        <Route path="/:handle" element={<LayoutAuth />}>
          <Route index={true} element={<HandleView />} />
        </Route>

        <Route path="/404" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}
