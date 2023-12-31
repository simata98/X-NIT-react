import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { styled } from "styled-components";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";
import AOS from 'aos';
import 'aos/dist/aos.css';

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  // getDocs 사용 시 snapshot을 한번만 받아옴
  // onSnapshot 사용 시 realtime으로 데이터를 받아옴

  useEffect(() => {
    AOS.init({duration: 2000});
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25),
      );
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweets(tweets);
        AOS.refresh();
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper data-aos="fade-up">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
