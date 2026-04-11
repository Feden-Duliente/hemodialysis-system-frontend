import React, { useState } from "react";
import { Link } from "react-router-dom";


import logo from "../assets/hemodialysis.png";
import logout from "../assets/logout.png"
import bot from "../assets/bot.png"
import hemobot from "../assets/hemo-bot.png";
import close from "../assets/close.png";
import send from "../assets/send.png";
import {
  HomeIcon,
  CurrencyDollarIcon,
  BeakerIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";



export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello 👋 I'm HemoCare Assistant.\n\nDo you want me to summarize the report for today?",
    },
  ]);
  const [input, setInput] = useState("");


  // send a message in the body
  const handleSend = () => {
    if (!input.trim()) return;


    const newMessage = {
      type: "admin",
      text: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

  };


  return (
    <>
      <div className="w-full bg-white shadow px-8 py-2 flex justify-between items-center border-t">

        {/* logo */}
        <div className="flex items-center justify-center">
          <img src={logo} className="h-10 w-10" />
          <h2 className="text-black text-[16px] font-bold tracking-[0.05rem]">HemoCare</h2>
        </div>

        {/* navigator */}
        <div className="flex items-center gap-6">

          {/* Home */}
          <Link to="/">
            <div className="flex items-center gap-1 text-black cursor-pointer hover:bg-gray-300/70 rounded-[5px] py-[5px] px-[8px]">
                <HomeIcon className="h-3 w-3" />
                <span className="text-[10px]">Home</span>
            </div>
          </Link>

          {/* Doctor Fees */}
          <Link to="/doctor-fees">
            <div className="flex items-center gap-1 text-black cursor-pointer hover:bg-gray-300/70 rounded-[5px] py-[5px] px-[8px]">
                <CurrencyDollarIcon className="h-3 w-3" />
                <span className="text-[10px]">Doctor Fees</span>
            </div>
          </Link>

          {/* Expiring Labs */}
          <Link to="/expiring-labs">
            <div className="flex items-center gap-1 text-black cursor-pointer hover:bg-gray-300/70 rounded-[5px] py-[5px] px-[8px]">
              <BeakerIcon className="h-3 w-3" />
              <span className="text-[10px]">Expiring Labs</span>
            </div>
          </Link>

          {/* PhilHealth */}
          <Link to="/philhealth">
            <div className="flex items-center gap-1 text-black cursor-pointer hover:bg-gray-300/70 rounded-[5px] py-[5px] px-[8px]">
              <IdentificationIcon className="h-3 w-3" />
              <span className="text-[10px]">PhilHealth</span>
            </div>
          </Link>

          {/* Schedules */}
          <Link to="/schedules">
            <div className="flex items-center gap-1 text-black cursor-pointer hover:bg-gray-300/70 rounded-[5px] py-[5px] px-[8px]">
              <CalendarDaysIcon className="h-3 w-3" />
              <span className="text-[10px]">Schedules</span>
            </div>
          </Link>

          {/* Activity Logs */}
          <Link to="activity-logs">
            <div className="flex items-center gap-1 text-black cursor-pointer hover:bg-gray-300/70 rounded-[5px] py-[5px] px-[8px]">
              <ClipboardDocumentListIcon className="h-3 w-3" />
              <span className="text-[10px]">Activity Logs</span>
            </div>
          </Link>

        </div>

        {/* AI assistant */}
        <div onClick={() => setOpen(true)} className="flex items-center justify-center gap-2 hover:bg-gray-300/70 rounded-[5px] py-[5px] px-[8px] cursor-pointer">
          <img src={bot} className="h-3 w-3" />
          <span className="text-[10px]">AI Assistant</span>
        </div>


        {/* logout */}
        <div className="flex items-center justify-center gap-2 hover:bg-gray-300/70 rounded-[5px] py-[5px] px-[8px]">
          <img src={logout} className="h-3 w-3" />
          <span className="text-sm font-medium text-[10px]">Logout</span>
        </div>
      </div>
      

      {/* start: AI modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
          <div className="bg-white shadow-lg rounded-[2px] w-[30rem] h-[30rem] flex flex-col relative">

            {/* header */}
            <div className="w-full h-15 shadow-lg rounded-t-[2px] bg-[#002060] flex items-center justify-between">
              <div className="flex items-center justify-center py-2 px-4 gap-2">
                <img src={hemobot} className="w-9 h-9" />
                <h2 className="text-white font-semibold tracking-[0.1em] text-[12px]">HemoCare Assistant</h2>
              </div>
              <div className="flex items-center justify-center py-2 px-4">
                <img onClick={() => setOpen(false)} src={close} className="w-5 h-5" />
              </div>
            </div>

            {/* chat body */}
            <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-3 no-scrollbar">

              {messages.map((msg, index) => (
                msg.type === "admin" ? (
                  <div key={index} className="flex justify-end items-start gap-2">
                    <div className="bg-[#ADC1E5] shadow-sm rounded-[2px] px-3 py-2 text-[9px] max-w-[40%] text-justify">
                      {msg.text}
                    </div>

                    <img src={logo} className="w-7 h-7 rounded-full" alt="bot" />

                  </div>
                ) : (
                  <div key={index} className="flex justify-start items-end gap-2">
                    <img src={hemobot} className="w-7 h-7 rounded-full"  alt="bot"  />
                    <div className="bg-[#D9D9D9] shadow-sm rounded-[2px] px-3 py-2 text-[9px] max-w-[40%] text-justify">
                      {msg.text}
                    </div>

                  </div>
                )
              ))} 

            </div>

            {/* input message */}
            <div className=" py-3 px-4 flex items-center gap-2">
              <input type="text" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") { e.preventDefault(); handleSend(); }}} className="flex-1 bg-[#D0DBF0] rounded-[20px] px-3 py-2 text-[9px] outline-none" />

              <button onClick={handleSend} className=" text-white rounded-[2px] text-[12px] hover:scale-120 transition-transform duration-200 ease-in-out">
                <img src={send} className="w-5 h-5" />
              </button>

            </div>

          </div>
        </div>
      )}
      {/* end: AI modal */}

    </>
  )
}