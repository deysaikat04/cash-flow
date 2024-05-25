import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function Footer() {
  return (
    <Fragment>
      <div>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            const url = "https://in.linkedin.com/in/iamsaikat";
            window.open(url, "_blank");
          }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            const url = "https://github.com/deysaikat04";
            window.open(url, "_blank");
          }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            const url = "https://www.facebook.com/saikat.dey.sak";
            window.open(url, "_blank");
          }}
        >
          <FacebookIcon />
        </IconButton>

        <IconButton
          aria-label="add an alarm"
          size="small"
          onClick={() => {
            const url = "https://www.instagram.com/saikat.dey_/";
            window.open(url, "_blank");
          }}
        >
          <InstagramIcon />
        </IconButton>
      </div>
      <Typography
        variant="caption"
        align="center"
        style={{ display: "inline-block" }}
      >
        Crafted with Love by Saikat Dey {new Date().getFullYear()}
        {"."}
      </Typography>
    </Fragment>
  );
}
