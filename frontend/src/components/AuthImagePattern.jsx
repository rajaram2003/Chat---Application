const AuthImagePattern = ({ title, subtitle }) => {
  const messages = [
    "New Message 💬", 
    "Someone is typing…", 
    "Seen ✔✔", 
    "Missed Call 📞", 
    "You: Hey! 👋", 
    "Online Now 🟢", 
    "Incoming Call… 📲", 
    "Message Sent ✅", 
    "Delivered 📩"
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`relative aspect-square rounded-2xl transition-all duration-300 
                bg-gradient-to-br from-blue-500/10 to-purple-500/20 shadow-lg 
                hover:scale-110 hover:shadow-2xl hover:bg-blue-500/30 group
                ${i % 2 === 0 ? "animate-pulse" : ""}`}
            >
              {/* Hover Chat Messages */}
              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {i === 1 ? (
                  <span className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-150">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </span>
                ) : (
                  msg
                )}
              </span>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
