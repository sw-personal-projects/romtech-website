"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    AgentInitializer?: {
      init: (config: {
        agentRenderURL: string;
        rootId: string;
        formID: string;
        queryParams: string[];
        domain: string;
        isDraggable: boolean;
        background: string;
        buttonBackgroundColor: string;
        buttonIconColor: string;
        variant: boolean;
        customizations: {
          greeting: string;
          greetingMessage: string;
          openByDefault: string;
          pulse: string;
          position: string;
          autoOpenChatIn: string;
        };
        isVoice: boolean;
      }) => void;
    };
  }
}

const ChatBotWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/agent/embedjs/01956548d2957c8788d49f8c60535cdb19c9/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.AgentInitializer) {
        window.AgentInitializer.init({
          agentRenderURL: "https://agent.jotform.com/0195db207730778d9f2daf90eb468a979988",
          rootId: "JotformAgent-0195db207730778d9f2daf90eb468a979988",
          formID: "0195db207730778d9f2daf90eb468a979988",
          queryParams: ["skipWelcome=1", "maximizable=1"],
          domain: "https://www.jotform.com",
          isDraggable: false,
          background: "linear-gradient(180deg, #67b117 0%, #9eeb49 100%)",
          buttonBackgroundColor: "#63b413",
          buttonIconColor: "#FFFFFF",
          variant: true,
          customizations: {
            greeting: "Yes",
            greetingMessage: "Hi! How can I assist you?",
            openByDefault: "No",
            pulse: "Yes",
            position: "right",
            autoOpenChatIn: "0",
          },
          isVoice: true,
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default ChatBotWidget;