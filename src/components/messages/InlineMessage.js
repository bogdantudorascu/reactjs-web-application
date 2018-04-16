import React from "react";
import PropTypes from "prop-types";

const InlineMessage = ({ text }) => (
  <span className="error">{text}</span>
);

InlineMessage.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineMessage;
