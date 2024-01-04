import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-columns: 1fr;
`;

export default function Home() {
  return (
    <Wrapper>
      <p>Home!</p>
    </Wrapper>
  );
}
