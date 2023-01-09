import { Header } from "./";

interface IProps {
  children: JSX.Element;
}

function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
