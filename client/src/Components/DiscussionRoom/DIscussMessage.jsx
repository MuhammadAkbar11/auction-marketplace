import { ArrowArcLeft, ArrowArcRight } from "phosphor-react";
import React from "react";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
// import guestImg from "";

const DiscussMessage = ({ message, sellerId, isAuthor }) => {
  const [reply, setReply] = React.useState("");

  const isSeller = sellerId === message.id_member;
  const date = new Date(message.tgl_dibuat);
  const messageTime = date.toLocaleTimeString("en-US", {
    // en-US can be set to 'default' to use user's browser settings
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="border-0 discuss-message py-0 bg-transparent mb-1">
      <Card.Body className="  py-1 pl-0 ">
        {isAuthor ? (
          <div className="d-flex justify-content-end mb-1 pl-5 ">
            <div className="mr10">
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">Click to reply</Tooltip>
                }
              >
                <span className="d-inline-block">
                  <Button
                    variant="transparent"
                    className="p-0 shadow-none border-0  "
                  >
                    <ArrowArcLeft size={21} />
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
            <Card
              className="rounded border-0 message-content bg-primary "
              style={{
                minWidth: 100,
              }}
            >
              <Card.Body className="px-2 my-0 text-gray-600 py-1 d-flex align-items-end flex-column ">
                <p className="my-0  text-gray-400 ">{message?.isi_pesan}</p>
                <small>{messageTime}</small>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div className="d-flex mb-1 justify-content-start mb-1 pr-5 ">
            <div className={`d-flex align-items-end mr-3 `}>
              <img
                src={"/" + message?.member?.foto}
                className="rounded-circle mt-auto"
                height={40}
                width={40}
                alt={message?.member?.username || "baebid"}
              />
            </div>
            <Card
              className="rounded border-0 message-content bg-gray-200 "
              style={{
                minWidth: 100,
              }}
            >
              <Card.Body className="px-2  py-1">
                <div className="d-flex align-items-center ">
                  <span className="mr-1 ">
                    <small className="text-black font-weight-bold">
                      {message?.member?.username}
                    </small>
                    {isSeller && (
                      <small className="text-danger font-italic text-spacing-0 ">
                        {"[ Penjual ]"}
                      </small>
                    )}
                  </span>
                </div>
                <p className="my-0 text-dark  ">{message?.isi_pesan}</p>
                <div className="mt-n1 text-right ">
                  <small>{messageTime}</small>
                </div>
              </Card.Body>
            </Card>
            <div className="ml10">
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">Click to reply</Tooltip>
                }
              >
                <span className="d-inline-block">
                  <Button
                    variant="transparent"
                    className="p-0 shadow-none border-0  "
                  >
                    <ArrowArcRight size={21} />
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default DiscussMessage;
