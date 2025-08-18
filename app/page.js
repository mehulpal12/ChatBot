"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageSquare, Zap, Shield, Brain, Clock, Users, ArrowRight, Sparkles, Globe, Lock } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function IntroPage() {
  const [isStartingChat, setIsStartingChat] = useState(false)

  const handleStartChat = () => {
    setIsStartingChat(true)
    // Simulate navigation to chat interface
    setTimeout(() => {
      console.log("[v0] Navigating to chat interface...")
      // Here you would typically navigate to the chat page
      setIsStartingChat(false)
    }, 2000)
  }

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Advanced AI Intelligence",
      description:
        "Powered by cutting-edge language models that understand context, nuance, and provide human-like responses to complex queries.",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Lightning Fast Responses",
      description:
        "Get instant answers with our optimized infrastructure. No waiting, no delays - just immediate, intelligent assistance.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Privacy & Security First",
      description:
        "Your conversations are encrypted and private. We never store personal data or share your information with third parties.",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Natural Conversations",
      description:
        "Chat naturally like you would with a human. Our AI understands context, remembers previous messages, and maintains engaging dialogue.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "24/7 Availability",
      description:
        "Access intelligent assistance anytime, anywhere. Our AI never sleeps and is always ready to help with your questions.",
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Multi-Language Support",
      description:
        "Communicate in your preferred language. Our AI supports dozens of languages with native-level understanding.",
    },
  ]

  const useCases = [
    "Creative Writing & Brainstorming",
    "Code Review & Programming Help",
    "Research & Analysis",
    "Learning & Education",
    "Business Strategy & Planning",
    "Content Creation & Marketing",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ChatBot AI</h1>
              <p className="text-xs text-muted-foreground">Intelligent Assistant</p>
            </div>
          </div>
          <SignedOut>
             <SignInButton />
            
          </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            
        </div>
      </header>

      {/* Hero Section */}
      <section className="md:py-20 py-8 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Advanced AI
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Intelligent
            <span className="text-primary block">AI Assistant</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the future of conversation with our advanced AI chatbot. Get instant, intelligent responses to
            any question, 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href={"/Aichat"}>
            <Button href="/Aichat" size="lg" className="text-lg px-8 py-6 h-auto" onClick={handleStartChat} disabled={isStartingChat}>
              {isStartingChat ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Starting Chat...
                </>
              ) : (
                <>
                  Start Chating Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
            </Link>
           
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>10M+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Instant Responses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="md:py-20 py-8 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our AI Assistant?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful features that make our AI chatbot the perfect companion for all your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-2">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="md:py-20  px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Perfect for Every Task</h2>
          <p className="text-xl text-muted-foreground mb-12">
            From creative projects to technical challenges, our AI adapts to your needs.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors duration-200"
              >
                <span className="text-foreground font-medium">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience the Future?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of users who trust our AI assistant for intelligent, reliable conversations.
          </p>

         <Link href={"/Aichat"}>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 h-auto"
            onClick={handleStartChat}
            disabled={isStartingChat}
          >
            {isStartingChat ? (
              <>
                <div className="w-5 h-5 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Starting Your Chat...
              </>
            ) : (
              <>
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
         </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">ChatBot AI</span>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact Us
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Help Center
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ChatBot AI. All rights reserved. Built with advanced AI technology.
              <br />
              All trademarks and copyrights are the property of their respective owners.
              <h1>Mehul Pal</h1>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
