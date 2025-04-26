'use client';
import Image from "next/image";
import { useState } from "react";
import { assets } from "../../assets/assets";
import Sidebar from "@/components/Sidebar";
import PromptBox from "@/components/PromptBox";
import Message from "@/components/Message"

export default function Home() {

  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        {/* sidebar */}
        <Sidebar expand={expand} setExpand={setExpand} />

        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image className="rotate-180 cursor-pointer"
              src={assets.menu_icon}
              alt=""
              onClick={() => (expand ? setExpand(false) : setExpand(true))} />
            <Image className="opacity-70" src={assets.chat_icon} alt="" />
          </div>

          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image className="h-16" src={assets.logo_icon} alt="" />
                <p className="text-2xl font-medium">HI, I am DeepSeek</p>
              </div>

              <p className="text-sm mt-2">How can i help you today</p>
            </>
          ) : (

            <div>
              <Message role="user" content="What is NEXT.JS" />
            </div>

          )}

          {/* prompt-box */}

          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

          <p className="text-xs absolute bottom-1 text-gray-500">AI-Generative for reference only</p>

        </div>

      </div>
    </div>
  );
}
