import React from "react";
import heroImg01 from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";

const Home = () => {
  return (
    <>
      {/*======= hero section =======*/}
      <section className="hero_section pt-[30px] 2xl:h-[800px] w-full min-h-screen flex flex-col">
        <div className="container mx-auto flex-grow">
          <div className="flex flex-col lg:flex-row gap-[60px] items-center justify-between flex-grow">
            {/*====== hero content ====*/}
            <div className="lg:w-1/2">
              <div className="lg:w-[570px]">
                <h1 className="text-[28px] leading-[36px] text-headingColor font-[800] md:text-[48px] md:leading-[58px]">
                  We help patients live a healthy, longer life.
                </h1>
                <p className="text_para text-[14px] md:text-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore sequi eaque ullam velit alias minus sapiente. Eveniet
                  animi cumque laboriosam fugiat magni, natus facilis!
                  Voluptatum voluptatibus delectus neque omnis labore!
                </p>
                <button className="btn text-[14px] md:text-[16px]">
                  Request an Appointment
                </button>
              </div>

              {/*====== hero counter =======*/}
              <div className="mt-[20px] lg:mt-[40px] flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-[20px]">
                <div>
                  <h2 className="text-[28px] leading-[38px] lg:text-[32px] lg:leading-[42px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[80px] h-2 bg-yellowColor rounded-full block mt-[10px]"></span>
                  <p className="text_para text-[14px] md:text-[16px]">
                    Years of Experience
                  </p>
                </div>
                <div>
                  <h2 className="text-[28px] leading-[38px] lg:text-[32px] lg:leading-[42px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[80px] h-2 bg-purpleColor rounded-full block mt-[10px]"></span>
                  <p className="text_para text-[14px] md:text-[16px]">
                    Clinic Location
                  </p>
                </div>
                <div>
                  <h2 className="text-[28px] leading-[38px] lg:text-[32px] lg:leading-[42px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[80px] h-2 bg-irisBlueColor rounded-full block mt-[10px]"></span>
                  <p className="text_para text-[14px] md:text-[16px]">
                    Patient Satisfication
                  </p>
                </div>
              </div>
            </div>

            {/*====== hero image ====*/}
            <div className="lg:w-1/2 flex justify-end gap-[30px]">
              <div>
                <img className="rounded-lg" src={heroImg01} alt="" />
              </div>
              <div className="mt-[30px]">
                <img className="w-full mb-[30px]" src={heroImg02} alt="" />
                <img className="w-full" src={heroImg03} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*======= hero section end =======*/}
      <section>
        <div className="container mx-auto">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Providing the best medical services
            </h2>
            <p className="text_para text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
              optio iste, hic natus facilis sed tenetur labore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="Icon 1" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto, temporibus!
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className="group-hover:text-white w-6 h-6" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="Icon 2" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto, temporibus!
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-6" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="Icon 3" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Book an Appointment
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto, temporibus!
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />

      {/*===========services section ======*/}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our medical services</h2>
            <p className="text_para text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
              assumenda.
            </p>
          </div>

          <ServiceList />

        </div>
      </section>
    </>
  );
};

export default Home;
