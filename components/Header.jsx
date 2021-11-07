import Head from "next/head";

export default function Header() {
  return (
    <Head>
      <title>Foodie Cuisines</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/frontndev/image/upload/v1636249633/foodiecuisines/final_61872fbd8a744300a69c4096_718161.png"
      />
      <meta content="Foodie Cuisines" property="og:title" />
      <meta
        content="View, create and share food recipes"
        property="og:description"
      />
      <meta content="https://foodiecuisines.com" property="og:url" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
  );
}
