import React from "react";
import { Link } from "react-router-dom";
import {
  EnvolopeOpenIcon,
  FacebookIcon,
  PaperPlaneTiltIcon,
  PhoneIcon,
  TwitterIcon,
} from "../../UI/Icons/Index";
import { useDispatch, useSelector } from "react-redux";

const FooterWidget = ({ title, categories, contact, links }) => {
  return (
    <div className="footer-widget mb40">
      <h3 className="footer-title">{title}</h3>
      {!contact ? (
        <div
          className={`footer-info-list ${categories && "info-list-50-parcent"}`}
        >
          <ul className="pl-0">
            {links.map(link => (
              <li key={link.id}>
                <Link to={link.url}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="contact-info-2">
            <div className="single-contact-info-2">
              <div className="contact-info-2-icon">
                <PhoneIcon size={24} />
              </div>
              <div className="contact-info-2-content">
                <p>Got a question? Call us 24/7</p>
                <h3 className="text-primary mb-1">(365) 8635 56-24-02 </h3>
              </div>
            </div>
            <div className="single-contact-info-2">
              <div className="contact-info-2-icon">
                <PaperPlaneTiltIcon size={24} />
              </div>
              <div className="contact-info-2-content">
                <p>268 Orchard St, Mahattan, 12005, CA, United State</p>
              </div>
            </div>
            <div className="single-contact-info-2 mt-1">
              <div className="contact-info-2-icon mt-0">
                <EnvolopeOpenIcon size={24} />
              </div>
              <div className="contact-info-2-content">
                <p>contact@norda.com</p>
              </div>
            </div>
          </div>
          <div className="d-flex footer-social py-5 ">
            <Link to="#">
              <FacebookIcon size={24} />
            </Link>
            <Link to="#">
              <TwitterIcon size={24} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

FooterWidget.defaultProps = {
  title: "Footer Widget",
  links: [],
};

export default FooterWidget;
