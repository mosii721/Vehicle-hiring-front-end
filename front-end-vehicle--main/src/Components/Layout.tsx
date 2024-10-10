import Footer from "./Footer";
import Navbar from "./Topnav";

interface LayoutProps {
  children: React.ReactNode;  
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;