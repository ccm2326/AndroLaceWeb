import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import './PaperChatWidget.css';

const PaperChatWidget = ({ paperTitle, paperId, isEmbedded = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello! I'm your AI assistant for "${paperTitle}". I can help you understand this research paper, answer questions about its methodology, results, or implications. What would you like to know?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, paperTitle);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput, paperTitle) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('methodology') || input.includes('method')) {
      return `The methodology in "${paperTitle}" combines multiple research approaches including data analysis, field observations, and modeling techniques. The researchers used comprehensive data collection methods to ensure robust findings. Would you like me to elaborate on any specific aspect of their methodology?`;
    }
    
    if (input.includes('result') || input.includes('finding')) {
      return `The key findings in "${paperTitle}" reveal significant insights about the research topic. The study demonstrates important patterns and trends that contribute to our understanding of the field. The results show measurable impacts and provide valuable data for future research.`;
    }
    
    if (input.includes('conclusion') || input.includes('implication')) {
      return `The conclusions of "${paperTitle}" highlight the broader implications of the research. The study contributes important knowledge to the field and suggests directions for future investigation. The findings have practical applications and theoretical significance.`;
    }
    
    if (input.includes('author') || input.includes('researcher')) {
      return `The authors of "${paperTitle}" are leading experts in their field with extensive research experience. Their collaborative approach brings together diverse expertise to address complex research questions. Their previous work has been influential in advancing the field.`;
    }
    
    if (input.includes('data') || input.includes('dataset')) {
      return `The data used in "${paperTitle}" comes from multiple reliable sources including primary research, secondary data analysis, and validated datasets. The researchers employed rigorous data collection and validation procedures to ensure accuracy and reliability of their findings.`;
    }
    
    if (input.includes('limitation') || input.includes('challenge')) {
      return `Like all research, "${paperTitle}" has certain limitations that the authors acknowledge. These limitations provide opportunities for future research and help contextualize the findings. The study's scope and methodology were designed to address these challenges as effectively as possible.`;
    }
    
    // Default response
    return `That's an interesting question about "${paperTitle}". Based on the research presented in this paper, I can help you understand the key concepts, methodology, and implications. Could you be more specific about what aspect you'd like to explore further?`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What is the main methodology used?",
    "What are the key findings?",
    "What are the limitations of this study?",
    "How does this research contribute to the field?"
  ];

  return (
    <>
      {/* Floating Chat Button - Only show when not embedded */}
      {!isEmbedded && (
        <motion.button
          className="chat-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chat-widget ${isEmbedded ? 'embedded' : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-title">
                <Bot size={20} />
                <span>Paper Assistant</span>
              </div>
              <button
                className="chat-close-btn"
                onClick={handleClose}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  className="message bot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="message-avatar">
                    <Bot size={16} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="suggested-questions">
                <p>Try asking:</p>
                <div className="suggestions">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggestion-btn"
                      onClick={() => setInputMessage(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="chat-input">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about this paper..."
                rows="1"
                disabled={isTyping}
              />
              <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PaperChatWidget;
