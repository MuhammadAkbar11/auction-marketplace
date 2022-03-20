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
import SingleMessage from "./SingleMessage";
import { SERVER_ENDPOINT } from "../../constants/socket.constants";
import { useHistory } from "react-router-dom";
import { authLoginErrorMessageAction } from "../../actions/auth.actions";
import { removeDuplicateId } from "../../utils/replace";

let socket;

const DiscussionRoom = () => {
  const [roomId, setRoomId] = React.useState("");
  const [text, setText] = React.useState("");
  const [listMessage, setListMessage] = React.useState([]);
  const [listNewMessage, setListNewMessage] = React.useState([]);

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
      setListMessage(data.messages);
    });
  }, []);

  React.useEffect(() => {
    // get-room-newmessage

    socket.on("get-room-new-message", message => {
      message.isnew = true;
      const prevListMessage = listMessage;
      const prevListNewMessage = listNewMessage;
      if (message.id_parent == null) {
        let updatedListMessage = removeDuplicateId(prevListMessage, "id_pesan");
        let updatedListNewMessage = removeDuplicateId(
          prevListNewMessage,
          "id_pesan"
        );
        if (userInfo.id_member === message.member.id_member) {
          updatedListMessage.unshift(message);
          setListMessage(updatedListMessage);
        } else {
          updatedListNewMessage =
            updatedListMessage.length >= 5
              ? [message, ...updatedListNewMessage]
              : updatedListNewMessage;

          updatedListMessage =
            updatedListMessage.length >= 5
              ? updatedListMessage
              : [message, ...updatedListMessage];
          setListNewMessage(updatedListNewMessage);
          setListMessage(updatedListMessage);
        }
      }
    });
  }, [listMessage, listNewMessage]);

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

  const postReplyHandler = values => {
    handlePostMessage({ id_parent: values.id_parent, message: values.message });
    // socket.emit;
  };

  const concatNewMessages = () => {
    setListMessage(prevS => [...listNewMessage, ...prevS]);
    setListNewMessage([]);
  };

  const mainMessages = removeDuplicateId(listMessage, "id_pesan");

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Card body>
            <h5 className="mb-3">Ruang Diskusi Lelang</h5>
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
                      placeholder="Tanya"
                    />
                  </Form.Group>
                  <div>
                    <Button
                      disabled={text.trim() === ""}
                      type="submit"
                      className="ml-3 h-auto"
                    >
                      Tanya
                    </Button>
                  </div>
                </div>
              </Form>
            ) : (
              <Alert variant="info">
                Silahkan Login untuk dapat mengikuti diskusi
              </Alert>
            )}

            <section className="mt-4">
              {listNewMessage.length !== 0 && (
                <Button
                  size="sm"
                  block
                  className="mb-3"
                  onClick={concatNewMessages}
                >
                  {listNewMessage.length} messages
                </Button>
              )}

              {mainMessages.map(msg => {
                const messages = mainMessages.filter(
                  item => item.id_parent === msg.id_pesan
                );

                return (
                  msg.member !== null &&
                  msg.id_parent === null && (
                    <SingleMessage
                      key={msg.id_pesan}
                      onPostReply={postReplyHandler}
                      message={msg}
                      user={userInfo}
                      sellerId={auction.id_member}
                      messages={messages}
                    />
                  )
                );
              })}
            </section>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DiscussionRoom;
