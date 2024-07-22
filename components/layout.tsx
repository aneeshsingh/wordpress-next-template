import Alert from "@/app/components/alert";
import Footer from "@/app/components/footer";
import Meta from "@/app/components/meta";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
