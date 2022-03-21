import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";

import { SERVER_ENDPOINT } from "../../constants/socket.constants";
import { useHistory } from "react-router-dom";
import { authLoginErrorMessageAction } from "../../actions/auth.actions";
import { removeDuplicateId } from "../../utils/replace";
import DiscussMessage from "./DIscussMessage";
import { PaperPlaneTilt } from "phosphor-react";

let socket;

const DiscussionRoom = () => {
  const roomContainerRef = React.useRef(null);
  const messagesEndRef = React.useRef(null);
  const [roomId, setRoomId] = React.useState("");
  const [text, setText] = React.useState("");
  const [listMessage, setListMessage] = React.useState([]);

  const dispatch = useDispatch();

  const { auction } = useSelector(state => state.auctionDetails);
  const { userInfo } = useSelector(state => state.authUser);
  const auctionId = auction?.id_lelang;

  const history = useHistory();

  React.useEffect(() => {
    socket = io(SERVER_ENDPOINT);

    socket.emit("get-room-messages", { id_lelang: auctionId }, (data, err) => {
      if (err) {
        console.log(err);
        setListMessage([]);
        return;
      }
    });

    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, [auctionId]);

  React.useEffect(() => {
    socket.on("get-room-messages", data => {
      setRoomId(data?.id_ruang || "");
      setListMessage(data?.room_messages);
      scrollToBottom();
    });
  }, [roomContainerRef]);

  React.useEffect(() => {
    // get-room-newmessage

    socket.on("get-room-new-message", message => {
      message.isnew = true;
      setListMessage(prevState => {
        const todayMessageIndex = prevState.findIndex(
          item => item.date === "hari ini"
        );
        let updatedListMessage = [...prevState];
        if (prevState.length !== 0) {
          updatedListMessage[todayMessageIndex]?.messages.push(message);
        } else {
          updatedListMessage.push({
            date: "hari ini",
            messages: [message],
          });
        }

        return [...updatedListMessage];
      });
      scrollToBottom();
    });
  }, [roomContainerRef]);

  const scrollToBottom = () => {
    console.log(roomContainerRef.current.id);
    const el = document.querySelector(`#${roomContainerRef.current.id}`);

    roomContainerRef.current?.scrollTo({
      top: roomContainerRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handlePostMessage = values => {
    // const p
    if (userInfo) {
      const data = {
        token: userInfo.token,
        id_ruang: roomId,
        id_lelang: auctionId,
        id_member: userInfo.id_member,
        id_parent: values.id_parent,
        isi_pesan: values.message,
      };

      socket.emit("post-room-message", data, (result, err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      dispatch(authLoginErrorMessageAction("Silahkan login terlebih dahulu"));
      history.push("/akun/masuk");
    }
  };

  const handleSubmitMessage = e => {
    e.preventDefault();
    handlePostMessage({ id_parent: null, message: text });
    setText("");
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Card body>
            <h5 className="mb-3">Ruang Diskusi Lelang</h5>

            <div
              id="room-discuss-container"
              ref={roomContainerRef}
              className="mt-4 bg-gray-100 px-3 py-4 room-discuss-container"
            >
              {/* {mainMessages.map(msg => {
                return (
                  msg.member !== null &&
                  msg.id_parent === null && (
                    <SingleMessage
                      key={msg.id_pesan}
                      onPostReply={postReplyHandler}
                      message={msg}
                      user={userInfo}
                      sellerId={auction.id_member}
                      isAuthor={msg.member.id_member === userInfo.id_member}
                    />
                  )
                );
              })} */}
              {listMessage.map(item => {
                return (
                  <React.Fragment key={item.date}>
                    <div className="d-flex justify-content-center my-2 ">
                      <span className="badge bg-gray-200 rounded text-spacing-0 font-weight-light  ">
                        {item.date}
                      </span>
                    </div>
                    {item.messages.map(msg => {
                      return (
                        msg.member !== null &&
                        msg.id_parent === null && (
                          <DiscussMessage
                            key={msg.id_pesan}
                            message={msg}
                            user={userInfo}
                            sellerId={auction.id_member}
                            isAuthor={
                              msg.member.id_member === userInfo.id_member
                            }
                          />
                        )
                      );
                    })}
                  </React.Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <section className="mt-3">
              {" "}
              {userInfo ? (
                <Form onSubmit={handleSubmitMessage}>
                  <div className="d-flex align-items-stretch align-content-stretch ">
                    <Form.Group
                      controlId="text"
                      className="d-flex align-self-stretch flex-grow-1 "
                    >
                      <Form.Control
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="pesan anda"
                      />
                    </Form.Group>
                    <div>
                      <Button
                        disabled={text.trim() === ""}
                        type="submit"
                        className="ml-3 h-auto"
                      >
                        <PaperPlaneTilt size={20} />
                      </Button>
                    </div>
                  </div>
                </Form>
              ) : (
                <Alert variant="info">
                  Silahkan Login untuk dapat mengikuti diskusi
                </Alert>
              )}
            </section>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DiscussionRoom;
