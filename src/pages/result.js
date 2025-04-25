"use client";
import Image from "next/image";
import React, { useState } from "react";

const Result = () => {
  const [optionSelected, setOptionSelected] = useState("B");
  const [isCorrect, setIsCorrect] = useState(optionSelected === "B");

  const rewardMessages = {
    correct: {
      title: "Great!",
      message: "You get a chance to win Chupa Chups goodies.",
    },
    incorrect: {
      title: "Oops!",
      message: "Better luck next time.",
    },
  };

  return (
    <div className="relative py-11  h-svh md:h-screen max-w-4xl  mx-auto flex flex-col justify-between items-center">
      <Image
        style={{
          textShadow: "6px 6px 4px #FFF20066", // removed extra 0px
        }}
        className="self-center 2xl:w-45 2xl:h-45"
        src="/images/Chupa-Chups.png"
        width={120}
        height={120}
        alt="Chupa-Chups logo"
        priority
      />
      <section
        style={{
          boxShadow: " 0px 2.38px 4.76px 0px #00000040",
        }}
        // key={card.id}
        // onClick={() => setOptionSelected(card.id)}
        className={` bg-chupa-500 w-fit px-4 py-3 flex rounded-2xl transition-all duration-200 outline-4 outline-yellow-chupa/50  relative
        } 
        `}
      >
        <span className=" uppercase text-2xl md:text-sm leading-[100%] tracking-normal text-center absolute top-2.5 left-2.5">
          {/* {card.id}. */}
          {optionSelected}.
        </span>
        <Image
          className=" md:w-37.5 md:h-55  2xl:w-60 2xl:h-85"
          //   src={card.src}
          src={`/images/${optionSelected}.png`}
          width={220}
          height={320}
          alt="Picture of fun drop"
          priority={true}
        />

      </section>
      <div
        style={{
          boxShadow: " 0px 2.38px 4.76px 0px #00000040",
        }}
        className="relative bg-chupa-500  rounded-lg py-2.5 px-3  text-center leading-[100%]  w-4/5 md:min-w-[420px] md:max-w-[600px]"
      >
        <span className="text-2xl font-semibold ">
          {rewardMessages[isCorrect ? "correct" : "incorrect"].title}
          {/* Great! */}
        </span>


        <h2 className="text-base ">
          {rewardMessages[isCorrect ? "correct" : "incorrect"].message}
        </h2>

        {isCorrect && (
          <>
            <Image
              className="w-auto  bottom-5 md:bottom-0 right-0 z-10 object-cover absolute pointer-events-none"
              src={"/gif/ConfettiGIF.gif"}
              width={100}
              height={500}
              alt="Right confetti"
            />

            <Image
              className="w-auto  bottom-5 md:bottom-0  left-0 z-10  object-cover absolute pointer-events-none"
              src={"/gif/Left-confetti.gif"}
              width={100}
              height={500}
              alt="Left confetti"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Result;
