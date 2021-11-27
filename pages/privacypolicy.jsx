import React from "react";
import { Typography, Container, Divider } from "@mui/material";
import styles from "../styles/Home.module.css";

export default function PrivatePolicy() {
  return (
    <Container className={styles.container}>
      <Container className={styles.main}>
        <Typography variant="h6" gutterBottom>
          Foodie Cuisines Terms and Conditions Policy
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Welcome to Foodie Cuisines. These terms and conditions outline the
          rules and regulations for the use of Foodie Cuisines’s website.
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          By accessing this website, we assume you accept these terms and
          conditions in full. Do not continue to use the Foodie Cuisines website
          if you do not accept all of the terms and conditions stated on this
          page.
        </Typography>
        <Divider />
        <Typography variant="h6" component="p" gutterBottom sx={{ mt: 1 }}>
          Privacy:
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          By signing up to create an account on the Foodie Cuisines website, you
          agree to allow us to store your profile information associated with
          the OAuth provider you have chosen to sign up with Facebook, Github,
          and or Google. Accounts are created for the sole purpose of relating
          to recipes you have added as your favorites and/or recipes you have
          created. Profile information will not be sold or shared with any
          third-party companies.
        </Typography>
        <Divider />
        <Divider />
        <Typography variant="h6" component="p" gutterBottom sx={{ mt: 1 }}>
          Liability:
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          We are not responsible for any health issues, injuries, or deaths that
          may occur as a result of following the recipes on the Foodie Cuisines
          website. Some content can be uploaded by users. We are not responsible
          for any offensive or illegal content that is uploaded to the website,
          but will take the necessary actions to prevent such content from being
          added.
        </Typography>
        <Divider />
        <Divider />
        <Typography variant="h6" component="p" gutterBottom sx={{ mt: 1 }}>
          Cookies:
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          We employ the use of cookies. By using the Foodie Cuisines website,
          you consent to the use of cookies in accordance with Foodie Cuisines'
          privacy policy. Most modern interactive websites use cookies to enable
          us to retrieve user details for each visit. Cookies are used in some
          areas of our site to enable the functionality of these areas and ease
          of use for those visiting.
        </Typography>
        <Divider />
        <Divider />
        <Typography variant="h6" component="p" gutterBottom sx={{ mt: 1 }}>
          Intellectual Property:
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          Users may sign up to create an account to upload their own recipes to
          the website and/or add recipes to a favorites list on the account
          page. A recipe consists of an image or images and content that make up
          a food recipe. Any and all recipes on the Foodie Cuisines website
          belong to us. We may edit or delete any recipe at any time without
          notice. As a signed-up user, you have the right to edit and/or delete
          recipes that you upload. When uploading or editing recipes, you agree
          to only add content that pertains to a food cooking recipe. Any
          content that we consider not related to a food cooking recipe can be
          deleted.
        </Typography>
        <Divider />
        <Divider />
        <Typography variant="h6" component="p" gutterBottom sx={{ mt: 1 }}>
          External Links / Third-Party Links:
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          In some areas of the app, we use third-party links that users can use
          to share recipes and/or view recipe videos. We are not responsible or
          liable for any content that exists outside of the Foodie Cuisines
          website.
        </Typography>
        <Divider />
      </Container>
    </Container>
  );
}
