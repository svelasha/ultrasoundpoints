import * as React from "react";
import BatImg from ".././../assets/UltrasoundBat/Ultrasound_Bat.png";
import BatImg2x from ".././../assets/UltrasoundBat/Ultrasound_Bat@2x.png";
import BatImg3x from ".././../assets/UltrasoundBat/Ultrasound_Bat@3x.png";
import UsdImg from "../../assets/eth_btc/usd.png";
import EthImg from "../../assets/eth_btc/eth.png";
import BtcImg from "../../assets/eth_btc/btc.png";
import { TranslationsContext } from "../../translations-context";
import ContentBlockMedia from "../ContentBlock/ContentBlockMedia";

const TheUltraSound: React.FC<{}> = () => {
  const t = React.useContext(TranslationsContext);
  return (
    <>
      <section
        id="enter-ultra-sound"
        className="enther-ultr-sound py-8 px-4 md:px-8 lg:px-0 relative"
      >
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-offset="100"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          className="block pt-16"
        >
          <img
            title={t.eusm_section_title}
            alt={t.eusm_section_title}
            src={BatImg}
            srcSet={`${BatImg2x} 2x, ${BatImg3x} 3x`}
            className="mx-auto text-center mb-8"
          />
          <div className="ultra-sound-text text-2xl md:text-6xl mb-24">
            {t.eusm_section_title}
          </div>
        </div>
        <div className="slidercss">
          <ul className="slidercss-inner">
            <li className="w-full md:w-9/12 flex flex-wrap justify-center mr-auto">
              <div className="flex-1">
                <ContentBlockMedia
                  title={t.eusm_row_1_left_col_title}
                  text={t.eusm_row_1_left_col_text}
                />
              </div>
              <div className="flex-1">
                <img src={BtcImg} alt="btc" />
              </div>
            </li>
            <li className="w-full md:w-9/12 flex flex-wrap justify-center mr-auto">
              <div className="flex-1">
                <ContentBlockMedia
                  title={t.eusm_row_1_left_col_title}
                  text={t.eusm_row_1_left_col_text}
                />
              </div>
              <div className="flex-1">
                <img src={EthImg} alt="btc" />
              </div>
            </li>
            <li className="w-full md:w-9/12 flex flex-wrap justify-center mr-auto">
              <div className="flex-1">
                <ContentBlockMedia
                  title={t.eusm_row_1_left_col_title}
                  text={t.eusm_row_1_left_col_text}
                />
              </div>
              <div className="flex-1">
                <img src={UsdImg} alt="btc" />
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default TheUltraSound;
