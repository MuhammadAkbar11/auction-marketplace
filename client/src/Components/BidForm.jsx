import React from "react";
import { useSelector } from "react-redux";
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { onlyNumbers } from "../utils/replace";
import useKeepDigits from "../hooks/useKeepDigits";

const BidForm = ({
  loading,
  defaultValue,
  auction,
  handleBid,
  errorBidding,
}) => {
  const { userInfo } = useSelector(state => state.authUser);
  const [bidValue, setBidValue] = React.useState(defaultValue);
  const [bidValErr, setBidValErr] = React.useState(null);

  React.useEffect(() => {
    // if (!loading) {
    setBidValue(onlyNumbers(defaultValue));
    // }

    return () => {
      setBidValue("");
    };
  }, [defaultValue]);

  React.useEffect(() => {
    if (errorBidding) {
      setBidValue(onlyNumbers(defaultValue));
    }
  }, [errorBidding, defaultValue]);

  const [defValueNum] = useKeepDigits(defaultValue);

  const handleInc = () => {
    const multiple = onlyNumbers(auction?.kelipatan_hrg);
    const oldValue = bidValue;
    const result = +oldValue + +multiple;
    setBidValue(result);
  };

  const handleDec = () => {
    const multiple = onlyNumbers(auction?.kelipatan_hrg);
    const oldValue = bidValue;
    const result = +oldValue - +multiple;
    if (bidValue > defValueNum) {
      setBidValue(result);
      return;
    }
  };

  const handleOnChange = e => {
    const value = e.target.value;

    setBidValue(+value);

    if (+value <= defValueNum) {
      setBidValErr("Bid anda rendah dari bid saat ini!");
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    handleBid(bidValue);
    setBidValErr(null);
  };

  return (
    <>
      {userInfo ? (
        auction?.id_member !== userInfo.id_member ? (
          <>
            {errorBidding && (
              <Alert variant="danger">
                <small>{errorBidding}</small>
              </Alert>
            )}
            <div className="d-flex justify-content-between">
              {" "}
              <p>Masukan Bid Anda </p>{" "}
              {/* {bidValue !== defValueNum && (
                <p>Tawaran anda : Rp. {convertRupiah(+bidValue)}</p>
              )} */}
            </div>
            <Form onSubmit={handleOnSubmit}>
              <div className="d-flex pt-3" style={{ gap: 10 }}>
                <Button
                  variant="danger"
                  disabled={bidValue <= defValueNum || loading}
                  onClick={handleDec}
                >
                  -
                </Button>
                <Form.Control
                  type="number"
                  onChange={handleOnChange}
                  value={loading ? "0" : bidValue || ""}
                />
                <Button
                  variant="success"
                  disabled={loading}
                  onClick={handleInc}
                >
                  +
                </Button>
              </div>
              {bidValErr && (
                <>
                  <small className="text-danger mt-2">{bidValErr}</small> <br />
                </>
              )}
              <small className="mt-3">
                * Kelipatan Bid
                <span className="text-success">
                  {" "}
                  Rp. {auction?.kelipatan_hrg}
                </span>{" "}
              </small>
              <br />
              <Button
                disabled={bidValue <= defValueNum || loading}
                type="submit"
                className="mt-3"
              >
                Bid Now
              </Button>
            </Form>
          </>
        ) : (
          <>
            <p className="text-primary">
              *Tidak dapat menawarkan lelang sendiri
            </p>
          </>
        )
      ) : (
        <div>
          <Alert variant="primary">
            Silahkan login terlebih dahulu untuk dapat melakukan bid. <br />
            <Link
              style={{
                textDecoration: "underline",
              }}
              to={"/akun/masuk"}
            >
              Login sekarang
            </Link>
          </Alert>
        </div>
      )}
    </>
  );
};

export default BidForm;
