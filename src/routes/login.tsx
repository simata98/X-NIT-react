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
    async ({ username, password }: { username: string, password: string }) => {
      const response = await axios.post("http://localhost:8000/account/token/", {
        username,
        password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Save the token in local storage on success
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        document.cookie = `refresh_token=${data.refresh}; path=/;`;
        toast.success("로그인 성공!");
        navigate("/");
      },
      onError: () => {
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
        } catch (e) {
          console.log(e);
        }
        toast.error("로그인 실패");
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
