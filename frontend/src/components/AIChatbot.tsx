import React, { useState, useRef, useEffect } from "react";
import { X, Send, Minimize2, Maximize2, Lightbulb } from "lucide-react";

interface BotMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const faqDatabase = [
  {
    keywords: ["course", "registration", "enroll", "register"],
    response:
      "To register for a course, go to your Student Dashboard > Courses > Browse Courses. Click 'Enroll' on the desired course. Registration closes 2 weeks before the course starts.",
  },
  {
    keywords: ["grade", "gpa", "transcript", "score"],
    response:
      "Your grades and GPA are available in Student Dashboard > Grades. Official transcripts can be requested from the Registrar office. Grades are typically updated within 5 business days after assessment.",
  },
  {
    keywords: ["tuition", "fee", "payment", "billing", "balance"],
    response:
      "Visit Billing Dashboard to view your account balance and make payments. We accept credit cards, bank transfers, and installment plans. Payment is due before the semester starts.",
  },
  {
    keywords: ["assignment", "deadline", "submit", "homework"],
    response:
      "Assignments are submitted through your course page before the deadline. Late submissions may receive a penalty. Check your course syllabus for specific submission guidelines.",
  },
  {
    keywords: ["attendance", "absence", "class"],
    response:
      "Attendance policies vary by course. Check your syllabus for details. Report absences to your instructor. Multiple unexcused absences may affect your grade.",
  },
  {
    keywords: ["exam", "test", "quiz", "assessment"],
    response:
      "Exam schedules are posted on your Student Dashboard. Bring your student ID. No electronic devices allowed except where specified. Review the exam guidelines on the course page.",
  },
  {
    keywords: ["tech", "login", "password", "account", "access"],
    response:
      "For technical issues, visit the IT Help Center or contact support@semis.edu. You can reset your password on the login page. Account issues are typically resolved within 24 hours.",
  },
  {
    keywords: ["drop", "withdraw", "cancel", "unenroll"],
    response:
      "To drop a course, go to Dashboard > My Courses and click the drop option before the deadline (usually 4 weeks into the semester). Withdrawals may have financial or academic consequences.",
  },
  {
    keywords: ["scholarship", "grant", "financial", "aid", "loan"],
    response:
      "Financial aid information is available in your Student Dashboard > Finance. Applications typically open in January. Contact the Financial Aid office for eligibility and deadlines.",
  },
  {
    keywords: ["schedule", "timetable", "class time", "calendar"],
    response:
      "Your course schedule is displayed in your Student Dashboard. The academic calendar with important dates is available in the System Settings. All times are in local timezone.",
  },
];

const AIAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: "1",
      type: "bot",
      content: "Hi! 👋 I'm your AI Assistant. I can help with FAQs about courses, payments, grades, and more. What can I help you with?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantFAQ = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    for (const faq of faqDatabase) {
      if (faq.keywords.some((keyword) => lowerInput.includes(keyword))) {
        return faq.response;
      }
    }

    return "I'm not sure about that topic. Please contact support@semis.edu for assistance, or check the Help Center for more information.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: BotMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      const response = findRelevantFAQ(inputValue);
      const botMessage: BotMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-40 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition flex items-center justify-center z-40"
        title="AI Assistant"
      >
        <Lightbulb size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-72 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">AI Assistant</h3>
          <p className="text-xs text-purple-100">Instant answers to FAQs</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-white/20 rounded transition"
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "user" ? "text-purple-100" : "text-gray-600"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about courses, payments, grades..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAIChatbot;
