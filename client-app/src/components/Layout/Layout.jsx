import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = ({ categories, fetchCategories }) => {
  return (
    <div className={styles.contentContainer}>
      <NavBar
        categories={categories}
        fetchCategories={fetchCategories}
      />
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
