
interface ProcessBackgroundProps {
  activeTab: string;
}

const ProcessBackground = ({ activeTab }: ProcessBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Conceptualizing Background */}
      <div className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
        activeTab === "conceptualizing" ? "opacity-100 scale-100" : "opacity-0 scale-110"
      }`}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Development Background */}
      <div className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
        activeTab === "development" ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}>
        <div className="absolute top-32 right-16 w-36 h-36 bg-green-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-52 h-52 bg-emerald-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-60 left-1/3 w-44 h-44 bg-teal-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
    </div>
  );
};

export default ProcessBackground;
