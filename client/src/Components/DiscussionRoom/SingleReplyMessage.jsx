import React from "react";
import { Card } from "react-bootstrap";
import guestImg from "../../assets/images/guest.jpeg";

const SingleReplyMessage = ({ message, onShowReplyInput, isSeller }) => {
  return (
    <Card className=" border-0 ml50   ">
      <Card.Body className="text-dark pl-0 py-2 ">
        <div className="d-flex">
          <div className="mr-3">
            <img
              src={
                message?.member?.foto ? "/" + message?.member?.foto : guestImg
              }
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
            <p className="my-0 text-black ">{message.isi_pesan}</p>
            <a
              href="#/"
              className="btn p-0 btn-link text-gray-600 shadow-none text-capitalize"
              onClick={e => {
                e.preventDefault();
                onShowReplyInput();
              }}
            >
              Balas
            </a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleReplyMessage;
