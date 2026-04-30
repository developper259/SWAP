import ConversationList from '@/components/conversation-list';
import ChatWindow from '@/components/chat-window';

export const metadata = {
  title: 'Chat - Swap',
  description: 'Chat and negotiate trades',
};

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Left Column - Conversation List */}
      <div className="hidden md:flex w-80 flex-col border-r border-border">
        <ConversationList />
      </div>

      {/* Right Column - Chat Window */}
      <div className="flex-1 flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}
