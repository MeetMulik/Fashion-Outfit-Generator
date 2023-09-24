import React from "react";
import { Link } from "react-router-dom";
import Features from "./Features";
import PinkGradientBox from "./PinkGradientBox";
import BlueGradientBox from "./BlueGradientBox";
import WhiteGradientBox from "./WhiteGradientBox";

const Hero = () => {
  return (
    <div>
      <div className="bg-black pb-6 sm:pt-8 lg:pt-5">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 md:gap-16">
            <div className="xl:w-5/12 flex flex-col justify-center sm:text-center lg:text-left lg:py-12 xl:py-24">
              <p className="text-indigo-500 md:text-lg xl:text-xl font-semibold mb-4 md:mb-6">
                Your Personal Outfit Generator
              </p>

              <h1 className="text-white text-black-800 text-4xl sm:text-5xl md:text-6xl font-bold mb-8 md:mb-12">
                "Style Comes to Life: Your Wardrobe, Curated by Conversation"
              </h1>

              <p className="lg:w-4/5 text-gray-500 xl:text-lg leading-relaxed mb-8 md:mb-12">
                Elevate your fashion game effortlessly with our conversational
                outfit generator. Discover personalized style ensembles through
                the art of conversation.
              </p>

              <div className=" flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5">
                <div>
                  <Link
                    to="/chat"
                    className="relative inline-block text-lg group"
                  >
                    <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Chat</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="xl:w-5/12 h-48 lg:h-auto bg-gray-100 overflow-hidden shadow-lg rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?auto=format&q=75&fit=crop&w=1000"
                loading="lazy"
                alt="Photo by Fakurian Design"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </section>
          <PinkGradientBox />
          <Features />
          <BlueGradientBox />
        </div>
      </div>
    </div>
  );
};

export default Hero;
