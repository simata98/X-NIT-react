import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-columns: 1fr;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
