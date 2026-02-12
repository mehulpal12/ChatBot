"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { useUser } from "@clerk/nextjs";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import {
  Settings,
  HelpCircle,
  MessageSquare,
  Paperclip,
  Mic,
  Send,
  Bot,
} from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import ChatMessage from "./ChatMessage";
import ClientUserButton from "@/components/ClientUserButton";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatBotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { openUserProfile } = useClerk();
  const { signOut } = useClerk();

  const { user } = useUser();
  const { setTheme } = useTheme();

  const [inputMessage, setInputMessage] = useState("");
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id:  crypto.randomUUID(),
        content: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: [{ role: "user", content: inputMessage }],
        }),
      });
      if (!response.ok) {
        console.error("Error:", response.statusText);
      }
      setMessages([...messages, newMessage]);
      setInputMessage("");
      const data = await response.json();

      // Simulate bot response
      setTimeout(async () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content:
            data.response || "This is a simulated response from the bot.",
          sender: "bot",
          timestamp: new Date(),
        };
        // console.log(response);

        // console.log(JSON.stringify(botResponse, null, 2) + " this is response");

        setMessages((prev) => [...prev, botResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen  max-w-[95%] md:max-w-[80%] mx-auto flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}

        <div className=" border-b  px-6 py-4 flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6" />
            <Link href="/">
              <h1 className="text-xl font-semibold ">ChatBot</h1>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {/* <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut> */}
            <SignedIn>
              <ClientUserButton/>
            </SignedIn>
            <div className="hidden md:block">
              <Button className="relative z-10" onClick={() => setOpen(!open)}>
                ☰ Menu
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 md:px-6 py-3 md:container md:mx-auto">
          <h2 className="text-2xl text-center font-semibold  mb-6">
            Chat with our AI assistant
          </h2>

          {/* Messages */}
          <div className="space-y-4 mb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="w-10 h-10 flex-shrink-0">
                  {message.sender === "bot" ? (
                    <>
                      <AvatarFallback className="bg-gray-800 text-white">
                        <Bot className="w-5 h-5" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src={user?.imageUrl} />
                    </>
                  )}
                </Avatar>
                <div
                  className={`flex-1 ${
                    message.sender === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`text-sm text-gray-500 mb-1 ${
                      message.sender === "user" ? "text-right" : ""
                    }`}
                  >
                    {message.sender === "bot" ? "AI Assistant" : user?.fullName}
                  </div>
                  <div
                    className={`inline-block px-4 py-2
                      mb-16 rounded-lg max-w-md ${
                        message.sender === "bot"
                          ? "bg-gray-900 text-white border-2 border-white"
                          : "bg-blue-500 text-white"
                      }`}
                  >
                    <ChatMessage content={message.content} />

                    {/* {message.content} */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-2  rounded-lg border  p-2 fixed w-[80%] bottom-4 ">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0  md:text-3xl"
            />

            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}

      <div
        className={`w-80 bg-white border-l border-gray-200 p-6 ${
          open ? "block" : "hidden"
        }`}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Chat Details
        </h3>

        {/* User Info */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900">User</div>
              <div className="text-sm text-gray-500">
                {user ? user.fullName : "Guest User"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/ai-bot-avatar.png" />
              <AvatarFallback className="bg-gray-800 text-white">
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900">Bot</div>
              <div className="text-sm text-gray-500">AI Assistant</div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Settings</h4>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-3"
            >
              <Settings className="w-5 h-5 text-gray-500" />
              <div className="text-gray-700">
                <Button asChild onClick={() => openUserProfile()} className="">
                  Manage Account
                </Button>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-3"
            >
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">
                {" "}
                <Button asChild
                  onClick={() => signOut({ redirectUrl: "/" })}
                  className=""
                >
                  Logout
                </Button>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
