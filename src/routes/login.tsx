import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Content,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useMutation } from "react-query";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false); // shake animation [true, false
  const loginMutation = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const url = `127.0.0.1:8000/account/token/`;
      const promise = axios.post(url, {
        username : username,
        password : password,
      });
    
      const toastId = toast("로그인 중...", { autoClose: false });
    
      try {
        const response = await promise;
        toast.update(toastId, { type: toast.TYPE.SUCCESS, render: "로그인 성공!", autoClose: 5000 });
        return response.data;
      } catch (error) {
        toast.update(toastId, { type: toast.TYPE.ERROR, render: "로그인 실패", autoClose: 5000 });
        throw error;
      } finally {
        toast.dismiss(toastId);
      }
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        navigate("/");
      },
      onError: () => {
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
        } catch (e) {
          console.log(e);
        }
      },
    }
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default behavior of form
    setShake(false); // reset shake
    if (loginMutation.isLoading || email === "" || password === "") return;
    // create an account
    loginMutation.mutate({ username: email, password });
  };
  return (
    <Wrapper>
      <Content shake={shake ? true : undefined}>
        <Title>Log into NIT 𝕏</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            onChange={onChange}
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            required
          />
          <Input type="submit" value={isLoading ? "Loading..." : "Log In"} />
        </Form>
        <Switcher>
          계정이 없으신가요? <Link to="/create-account">가입하기🥰</Link>
        </Switcher>
        <GithubButton />
        <GoogleButton />
      </Content>
    </Wrapper>
  );
}
