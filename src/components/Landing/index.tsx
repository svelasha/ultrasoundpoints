import React from "react";
import Navigation from "../Navigation/Nav";
import Intro from "./Intro";
import BeforeGenesis from "./beforeGenesis";
import GenesisBlock from "./gennesis";
import EIPByzantium from "./eipByzantium";
import EIPConstantinopole from "./eipConstantinopole";
import EIP1559 from "./eip1559";
import BlockGoal from "./goal";
import TheMergeBlock from "./theMerge";
import EtherTheUltraSound from "./BlockBtcEthUsd";
import TwitterFam from "../TwitterFam";
import FaqBlock from "./faq";
import NftDrop from "../NftDrop/index";
import FollowingYou from "../FollowingYou";
import AOS from "aos";
import "aos/dist/aos.css";
import SupplyView from "../SupplyViewNew";
import TheBurnedCard from "./theBurnedCard";
import Stepper from "../Navigation/Stepper";
import { SteppersProvider } from "../../context/StepperContext";
import GweiDynamicBlock from "../GweiDynamicBlock";

const LandingPage: React.FC<{}> = () => {
  React.useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <SteppersProvider>
      <div className="wrapper bg-blue-midnightexpress">
        <Stepper />
        <Navigation />
        <GweiDynamicBlock />
        <Intro />
        <BeforeGenesis />
        <section data-navigationtrackingblock>
          <div>
            <GenesisBlock />
          </div>
          <div>
            <EIPByzantium />
          </div>
          <div>
            <EIPConstantinopole />
          </div>
          <div>
            <EIP1559 />
          </div>
          <div>
            <BlockGoal />
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-offset="100"
              data-aos-delay="100"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              className="flex flex-col px-4 md:px-0 mt-6 mb-16"
              id="supplyview"
            >
              <div className="wrapper_supply_graph_section relative w-5/6 m-auto px-11 py-11 rounded-xl">
                <SupplyView />
              </div>
              <div className="flex flex-wrap justify-center pt-20">
                <div id="line__supplyview" className="eclips-hr" />
              </div>
            </div>
            <TheMergeBlock />
          </div>
        </section>
        <EtherTheUltraSound />
        <FaqBlock />
        <section
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          className="flex px-4 md:px-8 lg:px-0 py-8 md:py-40"
          id="join-the-fam"
        >
          <div className="w-full md:w-5/6 lg:w-2/3 md:m-auto relative">
            <TwitterFam />
          </div>
        </section>
        <section
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          className="relative flex px-4 md:px-8 lg:px-0 py-24"
        >
          <div className="w-full md:w-5/6 lg:w-2/3 md:m-auto relative">
            <FollowingYou />
          </div>
        </section>
        <NftDrop />
        <TheBurnedCard />
      </div>
    </SteppersProvider>
  );
};

export default LandingPage;
