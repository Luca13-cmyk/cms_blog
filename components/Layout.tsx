import Head from "next/head";
import { Header } from "./";

interface IProps {
  children: JSX.Element;
}

function Layout({ children }: IProps) {
  return (
    <>
      <Head>
        <title>CMS Blog</title>
      </Head>
      <Header />
      {children}
    </>
  );
}

export default Layout;
