import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 420px;
  padding: 100px 0px;
  margin: 10 auto;
`;

export const Content = styled.div<{ shake?: boolean }>`
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: ${(props) => (props.shake ? "shake 0.5s" : "none")};
  --borderWidth: 5px;
  position: relative;
  border-radius: var(--borderWidth);
  filter: brightness(130%);

  &:after {
    content: "";
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(
      60deg,
      #f79533,
      #f37055,
      #ef4e7b,
      #a166ab,
      #5073b8,
      #1098ad,
      #07b39b,
      #6fba82
    );
    border-radius: calc(2 * var(--borderWidth));
    z-index: -1;
    animation: animatedgradient 5s ease alternate infinite;
    background-size: 300% 300%;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-0.5deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(0.5deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(0.5deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-0.5deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-0.5deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(0.5deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-0.5deg);
    }
  }
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
  width: 80%;
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
  color: red;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: white;
  }
`;
