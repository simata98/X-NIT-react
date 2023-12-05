import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Button = styled.span`
  margin-top: 10px;
  background-color: white;
  font-weight: 600;
  width: 80%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  gap: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GoogleButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Button onClick={onClick}>
      <Logo src="/public/google-mark.svg" />
      Google로 시작하기
    </Button>
  );
}