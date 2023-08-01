import Navbar from "../components/Navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="navbarHeight"></div>
      <div className="bg-gray-50">{children}</div>
    </>
  );
}
