import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import EditTweetForm from "./edit-tweet-form";


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255 , 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  &:last-child:not(:first-child) {
    align-items: center;
  }
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
  line-height: 1.4;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #666;
  border: 0;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #1d9bf0;
  border: 0;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const onDelete = async () => {
    const ok = confirm("게시글을 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      // do nothing
    }
  };

  const onEdit = () => setIsEditing((prev) => !prev);

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEditing ? (
          <EditTweetForm
            tweet={tweet}
            photo={photo}
            id={id}
            setIsEditing={onEdit}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <BtnWrapper>
            <DeleteButton onClick={onDelete}>삭제</DeleteButton>
            <EditButton onClick={onEdit}>
              {isEditing ? "취소" : "수정"}
            </EditButton>
          </BtnWrapper>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
}
