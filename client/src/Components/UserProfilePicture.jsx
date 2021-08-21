import React from "react";
import {
  OverlayTrigger,
  Overlay,
  Popover,
  ListGroup,
  Modal,
  Button,
} from "react-bootstrap";
import { Camera, Upload } from "phosphor-react";
import useSingleImageUploader from "../hooks/useSingleImageUploader";
import { useDispatch } from "react-redux";
import Loader from "./UI/Loader";
// import defaultImg from ""
import { userUploadPictureAction } from "../actions/user.actions";

const UserProfilePicture = ({ loadingProfile, image, username, dateJoin }) => {
  // useDispatch
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [showOverLay, setShowOverLay] = React.useState(false);

  const targetOverlay = React.useRef(null);
  const fileRef = React.useRef(null);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  const imageFile = useSingleImageUploader({ defaultImage: null });

  const handleSaveUpload = async () => {
    setLoading(true);
    try {
      // setTimeout(() => {
      await dispatch(
        userUploadPictureAction({ image: imageFile.image, username: username })
      );
      setLoading(false);
      imageFile.handleReset();
      handleClose();
      // }, 3000);
    } catch (error) {
      setLoading(false);
      imageFile.handleReset();
      handleClose();
    }
  };

  return (
    <>
      <div className="w-100 d-flex flex-column align-items-center pt-2 pb-5">
        <img
          ref={targetOverlay}
          style={{
            cursor: "pointer",
            objectFit: "cover",
          }}
          className=" rounded-circle "
          width={160}
          height={160}
          src={loadingProfile ? "/gifs/loading.gif" : image}
          alt=""
          onClick={() => setShowOverLay(!showOverLay)}
        />

        <h6 className="mt-3">{username}</h6>
        <small>Bergabung pada : {dateJoin}</small>
      </div>
      <Overlay
        target={targetOverlay.current}
        show={showOverLay}
        placement="bottom"
      >
        {props => (
          <Popover id="popover-basic" className="shadow-sm" {...props}>
            <Popover.Content className="p-0">
              <ListGroup>
                <ListGroup.Item
                  action
                  onClick={() => {
                    setShowOverLay(!showOverLay);
                    handleShow();
                  }}
                >
                  <Camera size={16} className="mr-2" /> Upload gambar
                </ListGroup.Item>
              </ListGroup>
            </Popover.Content>
          </Popover>
        )}
      </Overlay>
      <Modal show={modal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload gambar</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-4">
          {loading ? (
            <div className="d-flex justify-content-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-center">
                {imageFile.image ? (
                  <img
                    style={{
                      cursor: "pointer",
                    }}
                    width={200}
                    src={imageFile.image?.url}
                    alt={username}
                    className="mx-auto"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                    s
                  />
                ) : (
                  <>
                    <p>Silahkan upload gambar anda</p>
                  </>
                )}
              </div>
              <div className="mt-2 w-100 text-center pt-3">
                <input
                  type="file"
                  className="d-none"
                  ref={fileRef}
                  onChange={e => imageFile.handleFile(e.target.files)}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    fileRef.current.click();
                  }}
                >
                  <Camera size={16} className="mr-2" />{" "}
                  {imageFile.image ? "Ganti gambar" : "Upload gambar"}
                </Button>
                {imageFile.image && (
                  <Button size="sm" className="ml-2" onClick={handleSaveUpload}>
                    <Upload size={16} className="mr-2" />
                    <span>Simpan</span>
                  </Button>
                )}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserProfilePicture;
