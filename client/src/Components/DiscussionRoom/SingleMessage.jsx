import { m } from "framer-motion";
import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import SingleReplyMessage from "./SingleReplyMessage";
// import guestImg from "";

const SingleMessage = ({ messages, message, user, onPostReply, sellerId }) => {
  const [replyInput, setReplyInput] = React.useState(false);
  const [reply, setReply] = React.useState("");

  const showReplyInputHandler = () => {
    setReplyInput(true);
  };

  const postMessageHandler = e => {
    e.preventDefault();
    onPostReply({
      id_parent: message.id_pesan,
      message: reply,
    });
    setReply("");
    setReplyInput(false);
  };

  const isSeller = sellerId === message.id_member;

  return (
    <Card className="border-0 mb-1">
      <Card.Body className="  py-2 pl-0 ">
        <div className="d-flex mb-1">
          <div className="mr-3">
            <img
              src={"/" + message?.member?.foto}
              className="rounded-circle"
              height={40}
              width={40}
              alt={message?.member?.username || "baebid"}
            />
          </div>
          <div>
            <div className="d-flex align-items-center ">
              <span className="mr-1 text-black font-weight-bold">
                {message?.member?.username}{" "}
                {isSeller && (
                  <small className="text-danger font-italic text-spacing-0 ">
                    {"[ Penjual ]"}
                  </small>
                )}
              </span>
              <small className="text-gray-600 text-spacing-0 ">
                {message?.waktu_kirim}
              </small>
            </div>
            <p className="my-0 text-black ">{message?.isi_pesan}</p>
            <a
              href="#/"
              className="btn p-0 btn-link text-gray-600 shadow-none text-capitalize"
              onClick={e => {
                e.preventDefault();
                showReplyInputHandler();
              }}
            >
              Balas
            </a>
          </div>
        </div>
        {messages.length !== 0 &&
          messages.map(msg => {
            return (
              <SingleReplyMessage
                key={msg.id_pesan}
                message={msg}
                isSeller={msg.id_member === sellerId}
                onShowReplyInput={showReplyInputHandler}
              />
            );
          })}
        {replyInput && (
          <div className="mt-2 ml55 ">
            <Form onSubmit={postMessageHandler}>
              <div className="d-flex flex-column flex-md-row align-items-stretch align-content-stretch ">
                <Form.Group
                  controlId="text"
                  className="d-flex align-self-stretch flex-grow-1 "
                >
                  <Form.Control
                    type="text"
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    placeholder="Tanya"
                  />
                </Form.Group>
                <div>
                  <Button
                    disabled={reply.trim() === ""}
                    type="submit"
                    className="ml-md-3 h-auto"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SingleMessage;
