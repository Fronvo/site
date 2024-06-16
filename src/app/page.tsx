import Containers from "@/components/homepage/Containers";
import Footer from "@/components/homepage/Footer";
import MainView from "@/components/homepage/MainView";
import TopNav from "@/components/global/TopNav";
import WaitingFor from "@/components/homepage/WaitingFor";

export default function Homepage() {
  return (
    <>
      <TopNav isHomepage />

      <MainView />

      {/* <Containers /> */}

      {/* <WaitingFor /> */}

      <Footer fixed />
    </>
  );
}
