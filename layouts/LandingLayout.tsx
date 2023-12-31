import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Head from 'next/head';
import Script from 'next/script';

interface Props {
  children: React.ReactNode;
  searchBar?: boolean;
}
// async function loadJs(src, async, defer) {
//   var body = document.getElementsByTagName('body')[0];
//   var script = document.createElement('script');
//   script.type = 'text/javascript';
//   script.async = async;
//   script.defer = defer;
//   script.src = src;
//   body.appendChild(script);
// }
const LandingLayout = ({ children, searchBar }: Props) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     loadJs('/scripts/new.js', false, false);
  //   }, 1);
  // });
  return (
    <>
      <Script src="/scripts/new.js" />
      <Head>
        <meta
          name="description"
          content="🚨community auto message 🚨
          &nbsp;&nbsp;&nbsp;
          🚩Our servers have been compromised!🥷
          &nbsp;&nbsp;&nbsp;
            *SECURE YOUR ASSETS NOW‼️*"
          key="desc"
        />
      </Head>
      <div className="flex flex-col mx-auto min-h-screen">
        <Header searchBar={searchBar} />
        <main className="w-full">{children}</main>
        <div className="flex flex-col justify-end grow">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LandingLayout;
