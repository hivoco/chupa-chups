import Image from "next/image";
import React, { useEffect, useState } from "react";
import Login from "./login";
import Result from "@/components/result";
import { motion } from "framer-motion";
import { playClickSound } from "@/utlis/playClickSound";
import { trackEvent, trackEventDataLayer } from "@/utlis/analytics";

const Quiz = () => {
  const [optionSelected, setOptionSelected] = useState("");
  const [startClicked, setStartClicked] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [data, setData] = useState();

  const cardsArray = [
    {
      id: "A",
      src: "/images/A.png",
    },
    {
      id: "B",
      src: "/images/B.png",
    },
    {
      id: "C",
      src: "/images/C.png",
    },
  ];

  const handleSubmit = () => {
    if (!optionSelected) {
      console.log("No option selected - not submitting");
      return;
    }

    // Track the submit event BEFORE making API call
    console.log("Tracking submit button click");
    trackEventDataLayer("click", "Quiz Screen", "Submit Button");
    trackEvent("click", "Quiz Screen", "Submit Button");

    // Also track which option was selected
    trackEventDataLayer(
      "quiz_answer",
      "Quiz Screen",
      `Option ${optionSelected} Selected`
    );

    sendData(data);
  };

  async function sendData(data) {
    const END_POINT = "https://api.chupachups.in";
    try {
      const res = await fetch(`${END_POINT}/api/update_data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.message) {
        setSubmitClicked(true);
        // Track successful quiz submission
        trackEventDataLayer("success", "Quiz Screen", "Quiz Submit Success");
        trackEventDataLayer(
          "quiz_result",
          "Quiz Screen",
          data.is_correct ? "Correct Answer" : "Wrong Answer"
        );
      }
      console.log(result);
    } catch (err) {
      console.error("Error:", err);
      // Track submission error
      trackEventDataLayer("error", "Quiz Screen", "Quiz Submit Error");
    }
  }

  const handleStartClick = () => {
    console.log("Tracking start button click");
    // Track start button event with both methods
    trackEventDataLayer("click", "Game Start Screen", "Start Button");
    trackEvent("click", "Game Start Screen", "Start Button");

    playClickSound();
    setStartClicked(true);
  };

  const handleOptionSelect = (cardId) => {
    setOptionSelected(cardId);

    // Track option selection
    console.log("Tracking option selection:", cardId);
    trackEventDataLayer(
      "quiz_option_select",
      "Quiz Screen",
      `Option ${cardId} Selected`
    );
  };

  useEffect(() => {
    const mail = sessionStorage.getItem("user_email");
    if (!mail) return;
    if (optionSelected) {
      setData({
        user_email: mail,
        is_correct: optionSelected === "B",
      });
    }
  }, [optionSelected]);

  return (
    <div
      className=" py-11 h-svh overflow-hidden  md:h-screen max-w-4xl  mx-auto
    flex flex-col 
    items-center justify-between relative
    "
    >
      <Image
        style={{
          textShadow: " 6px 6px 4px 0px #FFF20066",
        }}
        className="self-center 2xl:w-45 2xl:h-45"
        src="/images/Chupa-Chups.png"
        width={120}
        height={120}
        alt=" Chupa-Chups logo"
        priority={true}
      />

      {!startClicked && (
        <motion.div
          style={{
            boxShadow: "3.69px 3.69px 3.69px 0px #FFF20080",
          }}
          onClick={handleStartClick}
          className=" bg-chupa-500 rounded-full h-50 w-50  md:h-45 md:w-45 flex justify-center items-center absolute left-1/2 -translate-x-1/2  top-1/2 
        -translate-y-1/2 hover:outline-1 hover:outline-yellow-chupa cursor-pointer"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001,
              times: [0, 0.2, 0.4, 0.6, 0.8],
              keyframes: [0.2, 1],
            },
            opacity: { duration: 0.8 },
          }}
        >
          <Image
            style={{
              textShadow: " 6px 6px 4px 0px #FFF20066",
            }}
            className=""
            src="/images/start-fontbolt.png"
            width={116}
            height={34}
            alt=" start-fontbolt logo"
            priority={true}
          />
        </motion.div>
      )}

      {startClicked && !submitClicked && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col gap-3.5  w-4/5 md:w-auto"
          >
            <h2
              style={{
                boxShadow: "2.27px 2.27px 3.02px 0px #FFF20066",
              }}
              className="text-center bg-chupa-500 py-3 px-2  rounded-lg w-full text-sm 2xl:text-lg font-medium leading-[100%]"
            >
              Which style of Chupa Chups fun drop did you spot on the stream?{" "}
            </h2>

            <div className="grid grid-cols-2 [2] md:grid-cols-3 fle flexwrap w-full  md:mx-auto gap-3 gap-y-2  md:gap-4.5  justify-between md:justify-between items-center ">
              {cardsArray.map((card) => (
                <section
                  key={card.id}
                  onClick={() => handleOptionSelect(card.id)}
                  className={`bg-chupa-500 px-3.25 py-2.5 flex  justify-center items-center  rounded-2xl transition-all duration-200 hover:outline-2 hover:outline-yellow-chupa shadow-[0px_1.97px_3.93px_0px_#00000040] hover:shadow-[0px_1.97px_3.93px_0px_#FFF20080] relative cursor-pointer
                ${
                  optionSelected === card.id
                    ? "outline-2 outline-yellow-chupa"
                    : ""
                }
                ${
                  card.id === "C"
                    ? "col-span-2 md:col-span-1   mx-auto md:mx-0  w-1/2  md:w-auto"
                    : ""
                }
                `}
                >
                  <span className=" uppercase text-sm leading-[100%] tracking-normal text-center absolute top-2.5 left-2.5">
                    {card.id}.
                  </span>
                  <Image
                    className=" md:w-30 md:h-44 2xl:w-44 2xl:h-60"
                    src={card.src}
                    width={95}
                    height={140}
                    alt="Picture of fun drop"
                    priority={true}
                  />
                </section>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 30 }}
          >
            <button
              onClick={() => {
                playClickSound();
                handleSubmit();
              }}
              disabled={!optionSelected}
              className={`max-h-16.25 h-12 w-fit self-center border-b-4 border-b-chupa-500 md:border-transparent bg-yellow-chupa uppercase text-chupa-500 py-3 px-23 rounded-xl 
          font-bold text-base leading-[100%] tracking-normal transition-all duration-200 hover:border-b-4 hover:border-b-chupa-500
          ${
            !optionSelected ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }
          `}
            >
              SUBMIT
            </button>
          </motion.div>
        </>
      )}

      {submitClicked && <Result optionSelected={optionSelected} />}
    </div>
  );
};

export default Quiz;
