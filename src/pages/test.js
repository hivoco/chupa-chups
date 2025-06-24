"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ChupaChups = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    user_email: "",
    phone_number: "",
    is_accepted: false,
  });

  function isValidEmail(email) {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
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
      console.log("Invalid data");
      return;
    }

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
        // Handle success - redirect to quiz or next step
        console.log("Success:", result);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <div className="grid overflow-hidden h-svh max-w-4xl md:h-screen w-full md:w-full md:justify-center mx-auto md:items-stretch items-center gap-4 py-11">
      
      {/* Logo */}
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

      {/* Prize Image */}
      <Image
        className="w-screen h-auto -mt-10 -mb-10 md:h-40 2xl:h-66 md:w-auto bg-transparent mx-auto"
        src="/images/y.png"
        alt="Headset and consoles gift"
        width={690}
        height={263}
        priority={true}
      />

      {/* Form Inputs */}
      <div className="w-4/5 mx-auto md:w-full md:max-w-72 relative z-10 flex flex-col gap-3 font-normal text-sm leading-[100%] tracking-normal">
        
        {/* Name Input */}
        <div className="w-full">
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
            className={`w-full min-h-12 p-4 py-3.5 text-center bg-chupa-500 border-b-3 border-b-yellow-chupa rounded-full shadow-lg placeholder-white outline-none 
            ${
              userDetails.name
                ? "text-chupa-500 bg-white font-semibold ring-2 border-none ring-chupa-500"
                : "text-white"
            }`}
          />
        </div>

        {/* Email Input */}
        <div className="w-full">
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
            className={`w-full min-h-12 p-4 py-3.5 text-center bg-chupa-500 border-b-3 border-b-yellow-chupa rounded-full shadow-lg placeholder-white outline-none  
            ${
              userDetails.user_email
                ? "text-chupa-500 bg-white font-semibold ring-2 border-none ring-chupa-500"
                : "text-white"
            }`}
          />
        </div>

        {/* Phone Input */}
        <div className="w-full">
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
            className={`w-full min-h-12 p-4 py-3.5 text-center bg-chupa-500 border-b-3 border-b-yellow-chupa rounded-full shadow-lg placeholder-white outline-none 
            ${
              userDetails.phone_number
                ? "text-chupa-500 bg-white font-semibold ring-2 border-none ring-chupa-500"
                : "text-white"
            }`}
          />
        </div>
      </div>

      {/* Terms and Continue Button */}
      <div className="grid gap-3 min-w-68 w-4/5 mx-auto md:w-full md:m-0">
        
        {/* Terms Checkbox */}
        <div
          onClick={() =>
            setUserDetails({
              ...userDetails,
              is_accepted: !userDetails.is_accepted,
            })
          }
          className="flex mx-auto items-center gap-1 font-normal text-xs leading-[100%] tracking-normal cursor-pointer"
        >
          <div className="flex items-center justify-center w-6 h-6 bg-white rounded border-2 border-chupa-500">
            {userDetails.is_accepted && (
              <Check size={16} className="text-chupa-500" />
            )}
          </div>
          <span className="bg-chupa-500 py-1.5 px-2 rounded-lg w-full text-nowrap text-white">
            I agree to the T&C of the game
          </span>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            sendData(userDetails);
          }}
          className="w-full cursor-pointer max-h-16.25 h-12 border-b-4 border-b-chupa-500 md:border-transparent bg-yellow-chupa uppercase text-chupa-500 py-3 rounded-xl 
          font-bold text-base leading-[100%] tracking-normal transition-all duration-200 hover:border-b-4 hover:border-b-chupa-500"
        >
          CONTINUE
        </button>
      </div>

    </div>
  );
};

export default ChupaChups;
