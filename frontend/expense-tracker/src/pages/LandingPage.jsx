import React from "react";
import { BarChart3, PieChart, TrendingUp, ArrowRight} from "lucide-react";
import { LuWalletMinimal, LuTwitter, LuGithub, LuLinkedin, LuMailOpen } from "react-icons/lu";
import { Link } from "react-router-dom";
const features = [
  {
    icon: "🧠",
    title: "AI-Powered Insights",
    desc: "Get personalized financial advice and spending analysis powered by Gemini AI to make smarter financial decisions.",
  },
  {
    icon: "🔒",
    title: "JWT Authentication",
    desc: "Bank-level security with JWT-based authentication ensures your financial data stays private and secure.",
  },
  {
    icon: "📊",
    title: "Dynamic Charts",
    desc: "Beautiful, interactive charts and visualizations using Recharts to track your spending patterns and trends.",
  },
  {
    icon: "⚡",
    title: "Real-time Tracking",
    desc: "Instantly track income and expenses with real-time updates and live balance calculations.",
  },
  {
    icon: "📥",
    title: "Export Reports",
    desc: "Download detailed financial reports in XLSX format for tax preparation and financial planning.",
  },
  {
    icon: "📱",
    title: "Responsive Design",
    desc: "Access your finances anywhere with our responsive design that works perfectly on all devices.",
  },
  {
    icon: "📈",
    title: "Monthly Analytics",
    desc: "Get detailed monthly breakdowns of your spending habits with trend analysis and insights.",
  },
  {
    icon: "📎",
    title: "Category Management",
    desc: "Organize expenses by categories with visual pie charts and spending distribution analysis.",
  },
];

const LandingPage = () => {
  return (

    
    <div className="font-sans text-gray-700">

    {/* Navigation Bar */}
       <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-sm text-gray-700 font-medium px-8 py-4">
      {/* Logo */}
      <div className="flex items-start justify-between">
        <div className="text-3xl font-bold text-blue-600">Expenzy</div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-3 lg:space-x-8">
          {/* Login link */}
          <Link to="/login" className="text-gray-800 font-bold hover:text-violet-700">
            Login
          </Link>
          {/* Get Started Button */}
          <Link to="/signup">
            <button className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-2 rounded-lg shadow-lg transition-all duration-300">
              <ArrowRight size={18} />
              Get Started
            </button>
          </Link >
        </div>
      </div>
    </nav>

      {/* HERO SECTION */}
      <section className="bg-white py-16 ml-10 mt-31">
        <div className="container mx-auto px-6 lg:flex lg:items-start lg:justify-between gap-12">
          {/* Left Text Section */}
          <div className="lg:w-1/2">
            <h1 className="text-6xl text-black font-bold leading-tight mb-6">
              Track Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-green-600">
                Finances
              </span>{" "}
              Like a Pro
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-sans">
              Experience seamless expense tracking with AI-powered insights,
              real-time analytics, and secure JWT authentication. Take control
              of your financial future today.
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-4">
              <Link to="/signup">
              <button className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-103 shadow-lg">
                Start Tracking Now <ArrowRight className="inline-block ml-2" />
              </button>
              </Link>
              <button className="px-6 py-3 border border-gray-300 font-medium rounded-lg transition-all duration-300 transform hover:scale-103 shadow-lg">
                View Demo
              </button>
        
            </div>
            <p className="text-medium text-gray-600 mb-6">
              Free to start. No credit card required.
            </p>
            <div className="flex space-x-8">
              <div>
                <p className="text-green-600 font-bold text-2xl">100%</p>
                <p className="text-medium text-gray-500">Secure</p>
              </div>
              <div>
                <p className="text-yellow-500 font-bold text-2xl">AI-Powered</p>
                <p className="text-medium text-gray-500">Insights</p>
              </div>
              <div>
                <p className="text-red-500 font-bold text-2xl">Real-time</p>
                <p className="text-medium text-gray-500">Tracking</p>
              </div>
            </div>
          </div>

          {/* Right Dashboard Demo */}
<div className="w-full lg:w-1/2 mt-6 lg:mt-0 p-4 lg:ml-10 space-y-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
  
  {/* Total Balance */}
  <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-base sm:text-lg text-gray-500">Total Balance</p>
        <p className="text-xl sm:text-2xl font-bold text-yellow-500">₹8,780</p>
      </div>
      <div className="p-3 bg-yellow-200 rounded-lg">
        <LuWalletMinimal className="h-6 w-6 text-yellow-600" />
      </div>
    </div>
  </div>

  {/* Income & Expense */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-green-100 rounded">
          <TrendingUp className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <p className="text-base sm:text-lg text-gray-500">Income</p>
          <p className="text-lg sm:text-xl font-semibold text-green-500">₹13,750</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-red-100 rounded">
          <BarChart3 className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <p className="text-base sm:text-lg text-gray-500">Expenses</p>
          <p className="text-lg sm:text-xl font-semibold text-red-500">₹4,970</p>
        </div>
      </div>
    </div>
  </div>

  {/* Recent Transactions */}
  <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
    <div className="flex items-center justify-between mb-3">
      <p className="text-base sm:text-lg font-medium">Recent Transactions</p>
      <PieChart className="h-6 w-6 text-gray-500" />
    </div>
    <div className="space-y-2 text-sm sm:text-base">
      <div className="flex justify-between">
        <span>🍕 Pizza</span>
        <span className="text-red-500">-₹100</span>
      </div>
      <div className="flex justify-between">
        <span>🍽️ Food</span>
        <span className="text-red-500">-₹200</span>
      </div>
      <div className="flex justify-between">
        <span>🚗 Transport</span>
        <span className="text-red-500">-₹100</span>
      </div>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-black md:text-4xl font-bold">
            Powerful Features for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500">
              Smart Finance
            </span>
          </h2>
          <p className="text-lg font-semibold text-gray-500 mt-4 max-w-2xl mx-auto">
            Everything you need to take control of your finances with
            cutting-edge technology and intuitive design.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-lg p-8 text-center hover:shadow-2xl  transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="px-10 py-20 text-center bg-gray-50">
        <h2 className="text-4xl text-black font-bold mb-6">
          How{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500">
            Expenzy
          </span>{" "}
          Works
        </h2>
        <p className="mb-10 font-semibold text-xl text-gray-500 max-w-xl mx-auto">
          Get started with expense tracking in just four simple steps. Our
          intuitive process makes financial management effortless.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center shadow-lg p-6 rounded-lg bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 flex items-center justify-center text-purple-600 font-bold text-2xl border-3 border-purple-600 rounded-full bg-purple-200 mb-2">
              1
            </div>
            <h3 className="font-semibold text-xl">Create Account</h3>
            <p className="text-sm text-gray-600">
              Sign up securely with JWT authentication. Your data is encrypted and protected.
            </p>
          </div>
          <div className="flex flex-col items-center text-center shadow-lg p-6 rounded-lg bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 flex items-center justify-center text-green-600 font-bold text-2xl border-3 border-green-600 rounded-full bg-green-200 mb-2">
              2
            </div>
            <h3 className="font-semibold text-xl">Track Transactions</h3>
            <p className="text-sm text-gray-600">
              Add income and expenses instantly. Categorize transactions for better organization.
            </p>
          </div>
          <div className="flex flex-col items-center text-center shadow-lg p-6 rounded-lg bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 flex items-center justify-center text-red-600 font-bold text-2xl border-3 border-red-600 rounded-full bg-red-200 mb-2">
              3
            </div>
            <h3 className="font-semibold text-xl">Visualize Data</h3>
            <p className="text-sm text-gray-600">
             View beautiful charts and analytics to understand your spending patterns.
            </p>
          </div>
          <div className="flex flex-col items-center text-center shadow-lg p-6 rounded-lg bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 flex items-center justify-center text-yellow-500 font-bold text-2xl border-3 border-yellow-500 rounded-full bg-yellow-100 mb-2">
              4
            </div>
            <h3 className="font-semibold text-xl">Get AI Insights</h3>
            <p className="text-sm text-gray-600">
              Receive personalized financial advice and smart recommendations from Gemini AI.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full flex justify-center px-4 py-12">
  <div className="bg-white shadow-lg rounded-2xl text-center px-8 py-10 max-w-5xl w-full">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
      Ready to Start Your Financial Journey?
    </h2>
    <p className="text-gray-600 mb-6">
      Join thousands of users who have already taken control of their finances with <br className="hidden md:block" />
      Expenzy's powerful tracking and AI-driven insights.
    </p>
    <Link to="/signup">
    <button className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-103 shadow-lg">
      Get Started for Free →
    </button>
    </Link>
    

  </div>
</section>


      {/* FAQ / CTA */}
      <section className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">Have Questions?</h2>
        <p className="mb-6 text-gray-600">
          Get answers to common questions about our pricing and features.
        </p>
        <button className="px-6 py-2 font-bold border-2 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">View FAQ</button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 px-10 py-10">
        <div className="flex flex-wrap justify-between">
          <div>
            <h2 className="text-purple-400 text-shadow-neutral-50 font-bold text-2xl">Expenzy</h2>
            <p className="text-gray-100 max-w-xs mt-2">
              Take control of your finances with AI-powered insights, secure
              tracking, and beautiful analytics.
            </p>
         <div className="flex space-x-4 mt-4 text-2xl">
  <a
    href="https://x.com/supritam88"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-purple-600 hover:scale-110 transition-transform duration-200"
  >
    <LuTwitter />
  </a>
  <a
    href="https://www.linkedin.com/in/supritam-sarkar-327778322/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-purple-600 hover:scale-110 transition-transform duration-200"
  >
    <LuLinkedin />
  </a>
  <a
    href="https://github.com/SupritamSarkar"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-purple-600 hover:scale-110 transition-transform duration-200"
  >
    <LuGithub />
  </a>
  <a
  href="mailto:supritamsarkar481@gmail.com"
  className="text-white hover:text-purple-600 hover:scale-110 transition-transform duration-200"
>
  <LuMailOpen />
</a>

</div>


          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-100 mt-6 md:mt-5">
            
            <div>
              <h4 className="font-semibold text-white mb-2">Company</h4>
              <ul>
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Legal</h4>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>GDPR</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-sm text-center mt-10 text-gray-200">
          <p>© 2025 Expenzy. All rights reserved.</p>
          <p className="mt-2 text-amber-100">Built with ❤️ By Supritam Sarkar</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
