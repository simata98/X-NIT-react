import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
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
import { auth } from "../firebase";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false); // shake animation [true, false
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default behavior of form
    setShake(false); // reset shake
    if (isLoading || email === "" || password === "") return;
    // create an account
    try {
      setLoading(true);
      const signInPromise = signInWithEmailAndPassword(auth, email, password);
      toast.promise(signInPromise, {
        pending: "로그인 중...",
        success: "로그인 성공!",
        error: "로그인 실패",
      });
      await signInPromise;
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorMessages: { [key: string]: string } = {
          "auth/email-already-in-use": "이미 사용된 이메일입니다.",
          "auth/invalid-email": "이메일이 올바르지 않습니다.",
          "auth/weak-password": "약한 패스워드 패턴입니다.",
          "auth/invalid-login-credentials": "올바르지 않은 로그인 정보입니다.",
          "auth/too-many-requests":
            "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.",
        };
        toast.error(errorMessages[e.code] || e.message);
        setShake(true);
      }
    } finally {
      setLoading(false);
    }
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
