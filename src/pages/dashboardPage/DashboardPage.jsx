import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./style.module.scss";
import Logo from "../../assets/Logo.svg";
import { UserContext } from "../../components/user/User";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("@token");
    toast.warning("Logout efetuado!");
    navigate("/login");
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <header>
            <div className={styles.logo}>
              <img src={Logo} alt="Logo Kenzie Hub" />
              <button className={styles.buttonSair} onClick={handleLogout}>
                Sair
              </button>
            </div>
          </header>
          <div>
            {user ? (
              <>
                <h1 className="title">Olá, {user.name}!</h1>
                <p>Curso escolhido: {user.course_module}</p>
              </>
            ) : (
              <p className={styles.paragraphy}>Carregando...</p>
            )}
          </div>
          <h2>Que pena! Estamos em desenvolvimento :(</h2>
          <span>
            Nossa aplicação está em desenvolvimento, em breve teremos novidades
          </span>
        </div>
      </main>
    </>
  );
};
