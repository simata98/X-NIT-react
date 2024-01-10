import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Switcher,
  Title,
  Wrapper,
  Form,
  Content,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";
import { toast } from "react-toastify";
import axios from "axios";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [shake, setShake] = useState(false); // shake animation

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "passwordConfirm") {
      setConfirmPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default behavior of form
    setShake(false); // reset shake
    if (
      isLoading ||
      name === "" ||
      email === "" ||
      password === "" ||
      password !== passwordConfirm
    ) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    // create an account
    try {
      setLoading(true);
      const promise = axios.post("http://localhost:8000/account/register/", {
        username: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      });
      toast.promise(
        promise,
        {
          pending: "회원가입 중...",
          success: "회원가입 성공!",
          error: "회원가입 실패",
        }
      );

      await promise;
    } catch (e) {
      toast.error(axios.isAxiosError<{ message: string }>(e));
      navigate("/login")
    } finally {
      setLoading(false);
      navigate("/login");
    }
    // set the name of the user
    // redirect to homepage
  };
  return (
    <Wrapper>
      <Content shake={shake ? true : undefined}>
        <Title>Join NIT 𝕏</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            required
          />
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
          <Input
            onChange={onChange}
            name="passwordConfirm"
            value={passwordConfirm}
            placeholder="Confirm Password"
            type="password"
            required
          />
          <Input
            type="submit"
            value={isLoading ? "Loading..." : "Create Account"}
          />
        </Form>
        <Switcher>
          계정이 이미 있으신가요? <Link to="/login">로그인 하기📲</Link>
        </Switcher>
        <GithubButton />
        <GoogleButton />
      </Content>
    </Wrapper>
  );
}
