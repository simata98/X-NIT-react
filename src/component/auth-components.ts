import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const errors = {
  "auth/email-already-in-use": "이미 사용된 이메일입니다.",
  "auth/invalid-email": "유효하지 않은 이메일입니다.",
  "auth/weak-password": "패스워드는 6자리 이상이어야 합니다.",
};

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: skyblue;
  }
`