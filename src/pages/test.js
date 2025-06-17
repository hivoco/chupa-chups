"use client";

import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound } from "@/utlis/playClickSound";
import * as gtag from "@/utlis/analytics";

const Login = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    user_email: "",
    phone_number: "",
    is_accepted: false,
  });

  // Show form after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  function isValidEmail(email) {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    console.log(pattern.test(email), "mail check");
    return pattern.test(email);
  }

  function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
  }

  function isValidData({ name, user_email, phone_number, is_accepted }) {
    return (
      name.trim() &&
      isValidEmail(user_email) &&
      isValidPhone(phone_number) &&
      is_accepted === true
    );
  }

  async function sendData(data) {
    if (!isValidData(data)) {
      console.log("Invalid data - not tracking event");
      return;
    }

    gtag.event({
      action: "Login Button",
      category: "Button Click",
      label: "User clicked login button",
    });

    const END_POINT = "https://api.chupachups.in";

    try {
      const res = await fetch(`${END_POINT}/api/insert_data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      sessionStorage.setItem("user_email", userDetails.user_email);

      if (result.message) {
        router.push("/quiz");
      }
      console.log(result);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const textImageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5
      }
    }
  };

  const giftImageVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const formSlideVariants = {
    hidden: { 
      y: "100vh",
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1
      }
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const inputVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="grid overflow-hidden h-svh max-w-4xl md:h-screen w-4/5 md:w-full md:justify-center md:place-items-center gap-5 2xl:gap-0 py-11 pb-0 mx-auto relative">
      
      {/* Main content - hidden when form shows */}
      <AnimatePresence>
        {!showForm && (
          <motion.div
            className="contents"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Logo */}
            <motion.div variants={logoVariants}>
              <Image
                style={{
                  textShadow: "6px 6px 4px 0px #FFF20066",
                }}
                className="mx-auto 2xl:w-45 2xl:h-45"
                src="/images/Chupa-Chups.png"
                width={120}
                height={120}
                alt="Chupa-Chups logo"
                priority={true}
              />
            </motion.div>

            {/* Text Images */}
            <motion.div 
              className="text-center flex flex-col gap-4 justify-center"
              variants={containerVariants}
            >
              <motion.div variants={textImageVariants}>
                <Image
                  src="/images/fun-supplies-text.png"
                  alt="Fun Supplies Incoming"
                  width={432}
                  height={120}
                  className="mx-auto h-[80px] w-auto 2xl:h-30"
                />
              </motion.div>

              <motion.div 
                variants={textImageVariants}
                transition={{ delay: 0.7 }}
              >
                <Image
                  src="/images/scan-to-play-text.png"
                  alt="Scan to Play and Win"
                  width={320}
                  height={120}
                  className="mx-auto h-[80px] w-auto 2xl:h-30"
                />
              </motion.div>
            </motion.div>

            {/* Gift Image */}
            <motion.div 
              className="bottom-0 flex items-end justify-center"
              variants={giftImageVariants}
            >
              <Image
                className="h-44 2xl:h-64 w-auto object-contain bg-transparent"
                src="/images/x.png"
                alt="Headset and consoles gift"
                width={690}
                height={263}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form - shows after delay */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center gap-6 px-4"
            variants={formSlideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Logo (smaller version for form view) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                className="mx-auto w-16 h-16"
                src="/images/Chupa-Chups.png"
                width={64}
                height={64}
                alt="Chupa-Chups logo"
              />
            </motion.div>

            {/* Form Inputs */}
            <motion.div
              className="w-full max-w-sm relative z-10 flex flex-col gap-3 font-normal text-sm leading-[100%] tracking-normal"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="w-full" variants={inputVariants}>
                <input
                  spellCheck={true}
                  type="text"
                  autoComplete="off"
                  inputMode="text"
                  name="name"
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      name: e.target.value,
                    })
                  }
                  minLength={3}
                  maxLength={20}
                  placeholder="Name"
                  className={`w-full min-h-12 p-4 py-3.5 text-center bg-chupa-500 border-b-3 border-b-yellow-chupa rounded-full shadow-lg placeholder-white outline-none transition-all duration-300 
                    ${
                      userDetails.name
                        ? "text-chupa-500 bg-white font-semibold ring-2 border-none ring-chupa-500 transform scale-105"
                        : "text-white hover:scale-105"
                    }
                  `}
                />
              </motion.div>

              <motion.div className="w-full" variants={inputVariants}>
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="E-mail ID"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      user_email: e.target.value,
                    })
                  }
                  value={userDetails.user_email}
                  className={`w-full min-h-12 p-4 py-3.5 text-center bg-chupa-500 border-b-3 border-b-yellow-chupa rounded-full shadow-lg placeholder-white outline-none transition-all duration-300
                    ${
                      userDetails.user_email
                        ? "text-chupa-500 bg-white font-semibold ring-2 border-none ring-chupa-500 transform scale-105"
                        : "text-white hover:scale-105"
                    }
                  `}
                />
              </motion.div>

              <motion.div className="w-full" variants={inputVariants}>
                <input
                  type="tel"
                  autoComplete="off"
                  placeholder="Phone Number"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      phone_number: e.target.value,
                    })
                  }
                  inputMode="numeric"
                  name="number"
                  minLength={10}
                  maxLength={10}
                  value={userDetails.phone_number}
                  className={`w-full min-h-12 p-4 py-3.5 text-center bg-chupa-500 border-b-3 border-b-yellow-chupa rounded-full shadow-lg placeholder-white outline-none transition-all duration-300
                    ${
                      userDetails.phone_number
                        ? "text-chupa-500 bg-white font-semibold ring-2 border-none ring-chupa-500 transform scale-105"
                        : "text-white hover:scale-105"
                    }
                  `}
                />
              </motion.div>
            </motion.div>

            {/* Checkbox and Button */}
            <motion.div
              className="grid gap-7 w-full max-w-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div
                onClick={() =>
                  setUserDetails({
                    ...userDetails,
                    is_accepted: !userDetails.is_accepted,
                  })
                }
                className="flex mx-auto items-center gap-1 font-normal text-xs leading-[100%] tracking-normal cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-6 h-6 bg-white rounded border-2 border-chupa-500 transition-all duration-200"
                  animate={{
                    scale: userDetails.is_accepted ? 1.1 : 1,
                    backgroundColor: userDetails.is_accepted ? "#ffffff" : "#ffffff"
                  }}
                >
                  <AnimatePresence>
                    {userDetails.is_accepted && (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check size={16} className="text-chupa-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <span className="bg-chupa-500 py-1.5 px-2 rounded-lg w-full text-nowrap group-hover:bg-opacity-90 transition-all duration-200">
                  I agree to the T&C of the game
                </span>
              </motion.div>

              <motion.button
                onClick={() => {
                  playClickSound();
                  sendData(userDetails);
                }}
                className={`w-full cursor-pointer max-h-16.25 h-12 border-b-4 border-b-chupa-500 md:border-transparent bg-yellow-chupa uppercase text-chupa-500 py-3 rounded-xl 
                font-bold text-base leading-[100%] tracking-normal transition-all duration-200 hover:border-b-4 hover:border-b-chupa-500 hover:shadow-lg
                ${isValidData(userDetails) ? 'hover:scale-105 active:scale-95' : 'opacity-60 cursor-not-allowed'}
                `}
                whileHover={isValidData(userDetails) ? { scale: 1.05, y: -2 } : {}}
                whileTap={isValidData(userDetails) ? { scale: 0.95 } : {}}
                disabled={!isValidData(userDetails)}
              >
                CONTINUE
              </motion.button>
            </motion.div>

            {/* Back button to return to initial view */}
            <motion.button
              onClick={() => setShowForm(false)}
              className="absolute top-4 left-4 p-2 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-all duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;