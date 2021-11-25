import React from "react";
import { Typography, Container, Divider, List, ListItemText } from "@mui/material";
import styles from "../styles/Home.module.css";

export default function PrivatePolicy() {
  return (
    <Container className={styles.container}>
      <Container className={styles.main}>
        <Typography variant="h4" gutterBottom>
          Foodie Cuisines Terms and Conditions Policy
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Welcome to Foodie Cuisines These terms and conditions outline the
          rules and regulations for the use of Foodie Cuisines’s Website.
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          By accessing this website we assume you accept these terms and
          conditions in full. Do not continue to use Foodie Cuisines website if
          you do not accept all of the terms and conditions stated on this page.
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and any or all Agreements:
          Client, You and Your refers to you, the person accessing this website
          and accepting the Company’s terms and conditions. The Company,
          Ourselves, We, Our and Us, refers to our Company. Party, Parties, or
          Us, refers to both the Client and ourselves, or either the Client or
          ourselves. All terms refer to the offer, acceptance and consideration
          of payment necessary to undertake the process of our assistance to the
          Client in the most appropriate manner, whether by formal meetings of a
          fixed duration, or any other means, for the express purpose of meeting
          the Client’s needs in respect of provision of the Company’s stated
          services/products, in accordance with and subject to, prevailing law
          of (Address). Any use of the above terminology or other words in the
          singular, plural, capitalisation and/or he/she or they, are taken as
          interchangeable and therefore as referring to same.
        </Typography>
        <Divider />
        <Typography variant="h5" component="p" gutterBottom sx={{ mt: 1 }}>
          Cookies:
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          We employ the use of cookies. By using Foodie Cuisines website you
          consent to the use of cookies in accordance with Foodie Cuisines
          privacy policy. Most of the modern day interactive websites use
          cookies to enable us to retrieve user details for each visit. Cookies
          are used in some areas of our site to enable the functionality of this
          area and ease of use for those people visiting. Some of our affiliate
          / advertising partners may also use cookies.
        </Typography>
        <Divider />
        <Divider />
        <Typography variant="h5" component="p" gutterBottom sx={{ mt: 1 }}>
          License:
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Unless otherwise stated, Foodie Cuisines and/or its licensors own the
          intellectual property rights for all material on Foodie Cuisines. All
          intellectual property rights are reserved. You may view and/or print
          pages from (Add URL) for your own personal use subject to restrictions
          set in these terms and conditions.
        </Typography>
        <Typography variant="h6" component="p" gutterBottom sx={{ mt: 1 }}>
          You Must Not:
        </Typography>
        <Divider />
      </Container>
    </Container>
  );
}
