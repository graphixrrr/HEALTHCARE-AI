import React from "react";

export default function AboutMe() {
  return (
    <div className="w-full max-w-4xl p-8 mt-8 glass-card accent-glow fade-in">
      <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-cyan-100 drop-shadow-lg text-center" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>
        About Me
      </h2>
      
      <div className="space-y-8">
        {/* Introduction Section */}
        <section className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-cyan-400 shadow-lg">
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">👨‍💻</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">Hi, I'm Aniket!</h3>
          <p className="text-lg text-cyan-100 leading-relaxed">
            A passionate developer who loves combining technology with healthcare to create meaningful solutions.
          </p>
        </section>

        {/* Healthcare Passion */}
        <section className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-lg border border-cyan-700">
          <h3 className="text-2xl font-semibold text-cyan-200 mb-4 flex items-center">
            <span className="mr-3">🏥</span>
            My Passion for Healthcare
          </h3>
          <p className="text-cyan-100 leading-relaxed mb-4">
            Healthcare has always fascinated me because it's where technology can make the most meaningful impact on people's lives. 
            The idea of using AI to help people understand their symptoms and get better healthcare guidance is incredibly exciting to me.
          </p>
          <p className="text-cyan-100 leading-relaxed">
            I believe that accessible healthcare information should be available to everyone, and technology can bridge the gap 
            between medical knowledge and everyday people who need guidance.
          </p>
        </section>

        {/* Coding Passion */}
        <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-lg border border-blue-700">
          <h3 className="text-2xl font-semibold text-blue-200 mb-4 flex items-center">
            <span className="mr-3">💻</span>
            My Love for Coding
          </h3>
          <p className="text-blue-100 leading-relaxed mb-4">
            Coding is my creative outlet and problem-solving tool. I love building applications that not only work well 
            but also provide a great user experience. The process of turning ideas into functional, beautiful applications 
            is what drives me every day.
          </p>
          <p className="text-blue-100 leading-relaxed">
            From frontend design to backend logic, I enjoy every aspect of the development process. 
            This project combines my favorite technologies: React for the frontend, Node.js/Python for the backend, 
            and AI integration for intelligent responses.
          </p>
        </section>

        {/* Project Description */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-700">
          <h3 className="text-2xl font-semibold text-purple-200 mb-4 flex items-center">
            <span className="mr-3">🚀</span>
            About This Project
          </h3>
          <p className="text-purple-100 leading-relaxed mb-4">
            HealthSymptom Finder is a fun project I created to explore the intersection of AI and healthcare. 
            It's designed to help people get preliminary guidance about their symptoms using Google's Gemini AI.
          </p>
          <p className="text-purple-100 leading-relaxed mb-4">
            This project showcases modern web development practices with a beautiful, responsive UI and 
            intelligent AI-powered responses. It's built with React, Tailwind CSS, and integrates with 
            Google's Gemini API for natural language processing.
          </p>
          <p className="text-purple-100 leading-relaxed">
            While this is a demonstration project and shouldn't replace professional medical advice, 
            it shows how AI can be used to make healthcare information more accessible and user-friendly.
          </p>
        </section>

        {/* Tech Stack */}
        <section className="bg-gradient-to-r from-pink-900/30 to-red-900/30 p-6 rounded-lg border border-pink-700">
          <h3 className="text-2xl font-semibold text-pink-200 mb-4 flex items-center">
            <span className="mr-3">⚡</span>
            Technologies Used
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-2xl mb-2">⚛️</div>
              <div className="text-sm font-semibold text-pink-100">React</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-sm font-semibold text-pink-100">Tailwind CSS</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-2xl mb-2">🤖</div>
              <div className="text-sm font-semibold text-pink-100">Gemini AI</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm font-semibold text-pink-100">Node.js</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center p-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg border border-cyan-700">
          <h3 className="text-xl font-semibold text-cyan-200 mb-4">Ready to Try It Out?</h3>
          <p className="text-cyan-100 mb-4">
            Experience how AI can help with symptom analysis and healthcare guidance.
          </p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Health Check
          </a>
        </section>
      </div>
    </div>
  );
} 