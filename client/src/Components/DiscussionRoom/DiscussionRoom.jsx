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

let socket;

const DiscussionRoom = ({ auctionId }) => {
  const [roomId, setRoomId] = React.useState("");
  const [text, setText] = React.useState("");
  const [listMessage, setListMessage] = React.useState([]);

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.authUser);
  // const {}

  const history = useHistory();

  React.useEffect(() => {
    socket = io(SERVER_ENDPOINT);

    socket.emit("get-room-messages", { id_lelang: auctionId }, (data, err) => {
      if (err) {
        console.log(err);
        setListMessage([]);
        return;
      }

      setRoomId(data?.id_ruang || "");
      setListMessage(data.messages);
    });

    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, [auctionId]);

  React.useEffect(() => {
    // get-room-newmessage
    socket.on("get-room-new-message", message => {
      setListMessage(prevState => {
        return [message, ...prevState];
      });
    });
  }, []);

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
        console.log(result);
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
              {listMessage.map(msg => {
                const messages = listMessage.filter(
                  item => item.id_parent === msg.id_pesan
                );
                return (
                  msg.id_parent === null && (
                    <SingleMessage
                      key={msg.id_pesan}
                      onPostReply={postReplyHandler}
                      message={msg}
                      user={userInfo}
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
