import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Hero3D from "../components/Hero3D";
import FeatureCard from "../components/FeatureCard";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      <Hero3D />

      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          DevSense AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 max-w-2xl mb-8"
        >
          AI-powered repository intelligence. Understand, explore,
          and analyze any codebase using advanced RAG architecture.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/app")}
          className="bg-blue-600 px-8 py-4 rounded-full text-lg font-semibold"
        >
          Enter Platform
        </motion.button>
      </div>

      {/* Features Section */}
      <div className="relative z-10 grid md:grid-cols-3 gap-8 px-10 pb-20">
        <FeatureCard title="Multi-Repo Intelligence" desc="Analyze multiple repositories independently." />
        <FeatureCard title="Claude-Powered Reasoning" desc="Advanced explanation layer using Anthropic Claude." />
        <FeatureCard title="High-Speed Vector Search" desc="FAISS-based semantic retrieval for precision." />
      </div>

    </div>
  );
}

export default Landing;