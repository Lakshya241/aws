import ChatWindow from "../components/ChatWindow";

function Dashboard() {
  return (
    <div className="h-screen bg-black text-white">
      <header className="p-4 border-b border-gray-800 text-lg font-bold">
        DevSense AI Platform
      </header>

      <ChatWindow />
    </div>
  );
}

export default Dashboard;