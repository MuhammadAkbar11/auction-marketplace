import React from "react";
import { useSelector } from "react-redux";
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { onlyNumbers } from "../utils/replace";
import convertRupiah from "../utils/convertRupiah";
import useKeepDigits from "../hooks/useKeepDigits";

const BidForm = ({ loading, defaultValue, auction, handleBid }) => {
  const { userInfo } = useSelector(state => state.authUser);
  const [bidValue, setBidValue] = React.useState(defaultValue);

  React.useEffect(() => {
    // if (!loading) {
    setBidValue(defaultValue);
    // }

    return () => {
      setBidValue("");
    };
  }, [defaultValue]);

  const [defValueNum] = useKeepDigits(defaultValue);
  const [bidValueNum] = useKeepDigits(bidValue);

  console.log(defaultValue);

  const handleInc = () => {
    const multiple = onlyNumbers(auction?.kelipatan_hrg);
    const oldValue = bidValueNum;
    const result = convertRupiah(+oldValue + +multiple);
    setBidValue(result.trim());
  };

  const handleDec = () => {
    const multiple = onlyNumbers(auction?.kelipatan_hrg);
    const oldValue = bidValueNum;
    const result = convertRupiah(+oldValue - +multiple);
    if (bidValueNum > defValueNum) {
      setBidValue(result.trim());
      return;
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    handleBid(bidValue);
  };

  return (
    <>
      {userInfo ? (
        auction?.id_member !== userInfo.id_member ? (
          <>
            <p>Masukan Bid Anda </p>
            <Form onSubmit={handleOnSubmit}>
              <div className="d-flex py-3" style={{ gap: 10 }}>
                <Button
                  variant="danger"
                  disabled={bidValueNum <= defValueNum || loading}
                  onClick={handleDec}
                >
                  -
                </Button>
                <Form.Control readOnly value={loading ? "0" : bidValue || ""} />
                <Button
                  variant="success"
                  disabled={loading}
                  onClick={handleInc}
                >
                  +
                </Button>
              </div>
              <small>
                * Kelipatan Bid
                <span className="text-success">
                  {" "}
                  Rp. {auction?.kelipatan_hrg}
                </span>{" "}
              </small>
              <br />
              <Button
                disabled={bidValueNum <= defValueNum || loading}
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
