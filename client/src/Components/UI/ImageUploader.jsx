import React from "react";
import { Download, Trash } from "phosphor-react";
import { Button, Card, Col, Row } from "react-bootstrap";
const ImageUploader = ({
  images,
  handleFile,
  handleDragOver,
  handleDrop,
  handleRemove,
  error,
}) => {
  const fileInput = React.useRef(null);

  return (
    <>
      <div className="dropzone-wrapper">
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInput.current.click()}
        >
          <p className="text-center">Drag and drop image here</p>
          <Download size={25} weight="bold" />
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            multiple
            hidden
            onChange={e => handleFile(e.target.files)}
          />
        </div>
        {error && <small className="text-danger">{error}</small>}
        <br />
        {images &&
          images.length !== 0 &&
          images.map((img, idx) => {
            const key = idx;
            return (
              <Card key={key} className="w-100 p-2 mt-2">
                <Row className="no-gutters position-relative ">
                  <Col xs={2}>
                    <img
                      src={img.url}
                      className="w-100 "
                      style={{
                        height: "100%",
                      }}
                    />
                  </Col>
                  <Col xs={10} className="px-3  ">
                    <Row>
                      <Col xs={10}>
                        <div className="d-flex flex-column justify-content-center  flex-grow-1 ">
                          <Card.Text className="my-0">
                            {img.file?.type}
                          </Card.Text>
                          <Card.Text className="my-0">
                            {img.file?.name}
                          </Card.Text>
                        </div>
                      </Col>
                      <Col xs={2}>
                        <a
                          href="#/"
                          onClick={e => {
                            e.preventDefault();
                            handleRemove(img);
                          }}
                          size="sm"
                          variant="link"
                          style={{ height: "max-content", width: 10 }}
                        >
                          <Trash size={18} />
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default ImageUploader;
