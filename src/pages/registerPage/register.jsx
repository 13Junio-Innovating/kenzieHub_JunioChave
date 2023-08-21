import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/inputs/input";
import styles from "./style.module.scss";
import { registerSchema } from "../shemaRegister/formShemaRegister";
import { api } from "../../api/axios";
import Logo from "../../assets/Logo.svg";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const submit = async (formData) => {
    try {
      await api.post("/users", formData);
      toast.success("Conta criada com sucesso!")
      navigate("/login");
    } catch (error) {
      if(error.response?.data === 
        "Incorrect email / password combination"){
      toast.error("Ops! Algo deu errado.")
      }
      console.log(error);
    }
  };
  const handleSignupClick = () => {
    navigate("/login");
  };

  return (
    <div className="backgroundFormContainer">
      <header>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo Kenzie Hub" />
        <button className={styles.buttonVoltar} onClick={handleSignupClick}>Voltar</button>
      </div>
      </header>
      <form onSubmit={handleSubmit(submit)} className={styles.formContainer}>
        <h2 className="title">Crie a sua conta</h2>
        <h3>Rapido e grátis, vamos nessa</h3>
        <Input
          title="Nome"
          placeholder="Digite aqui seu nome..."
          type="text"
          error={errors.name}
          {...register("name")}
        />
        <Input
          title="Email"
          placeholder="Digite aqui seu email..."
          type="email"
          error={errors.email}
          {...register("email")}
        />
        <Input
          title="Senha"
          placeholder="Digite aqui sua senha..."
          type="password"
          error={errors.password}
          {...register("password")}
        />
        <Input
          title="Confirmar sua senha"
          placeholder="Digite novamente sua senha..."
          type="password"
          error={errors.confirmPassword}
          {...register("confirmPassword")}
        />
        <Input
          title="Contato"
          placeholder="Opção de contato"
          type="text"
          error={errors.contact}
          {...register("contact")}
        />
        <Input
          title="bio"
          placeholder="Fale sobre você"
          type="text"
          error={errors.bio}
          {...register("bio")}
        ></Input>

        <label className={styles.labelSelect} htmlFor="courseModule">Módulo do Curso:</label>
        <select className={styles.select} id="courseModule" name="courseModule" required {...register("course_module")}>
          <option className={styles.option} value="">Selecione um módulo</option>
          <option value="Primeiro módulo (Introdução ao Frontend)">
            Primeiro módulo (Introdução ao Frontend)
          </option>
          <option value="Segundo módulo (Frontend Avançado)">
            Segundo módulo (Frontend Avançado)
          </option>
          <option value="Terceiro módulo (Introdução ao Backend)">
            Terceiro módulo (Introdução ao Backend)
          </option>
          <option value="Quarto módulo (Backend Avançado)">
            Quarto módulo (Backend Avançado)
          </option>
        </select>
        <button className="button_text" type="submit">
          Cadastrar
        </button>
        <Link to="/login" className="link">
          Já tenho uma conta
        </Link>
      </form>
    </div>
  );
};
