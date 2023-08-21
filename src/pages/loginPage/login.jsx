import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/inputs/input";
import { loginSchema } from "./formShemaLogin";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { api } from "../../api/axios";
import Logo from "../../assets/Logo.svg";
import styles from "./style.module.scss";

export const LoginPage = () => {
  const [isHidden, setIsHidden] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
    const submitLogin = async (formData) => {
  try {
    const response = await api.post("/sessions", formData);
    const token = response.data.token; 
    localStorage.setItem("@token", JSON.stringify(token));

    const profileResponse = await api.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    const { name, course_module } = profileResponse.data;

    toast("Login bem-sucedido!", "success");
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
  const handleSignupClick = () => {
    navigate("/register");
  };

  return (
    <>
    <div className="backgroundFormContainer">
      <header>
        <div className={styles.header}>
        <img src={Logo} alt="Logo Kenzie Hub" />
        </div>
      </header>
      <form
        onSubmit={handleSubmit(submitLogin)}
        className={styles.formContainer}>
        <h2>Login</h2>
        <Input
          title="Email"
          type="email"
          placeholder="Digite seu email..."
          error={errors.email}
          {...register("email")}
        />
         <div className={styles.passwordContainer}>
          <Input
            title="Senha"
            type={isHidden ? "password" : "text"}
            placeholder="Digite sua senha..."
            error={errors.password}
            {...register("password")}
          />
          <button
            type="button"
            className={styles.showHideButton}
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? <MdVisibilityOff /> : <MdVisibility />}
          </button>
        </div>
        <button type="submit" className="button_text">
          Acessar
        </button>
        <Link to="/register" className="link">
          Ainda não possui uma conta?
        </Link>
        <button type="button" className="button_text btn" onClick={handleSignupClick}>
          Cadastre-se
        </button>
      </form>
    </div>
    </>
  );
}
