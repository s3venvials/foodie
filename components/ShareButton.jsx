import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

export default function ShareButton({ children, url, style, quote, iconSize }) {
  return (
    <FacebookShareButton
      style={style}
      children={children}
      url={url}
      quote={quote}
    >
      <FacebookIcon size={iconSize} round />
    </FacebookShareButton>
  );
}
