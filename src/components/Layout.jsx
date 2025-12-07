import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
