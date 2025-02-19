import { useChatStore } from "../store/useChatStore";


const AnyOneTypingComponent = () => {
    // Use Zustand's shallow comparison to prevent unnecessary rerenders
    const usersTyping = useChatStore((state) => state.usersCurrentlyTyping);
  
    if (usersTyping.length === 0) return null;
  
    return (
      <div className="mt-2 text-sm text-blue-600">
        {usersTyping.length === 1 && (
          <span>{usersTyping[0]} is typing...</span>
        )}
        {usersTyping.length === 2 && (
          <span>{usersTyping[0]} and {usersTyping[1]} are typing...</span>
        )}
        {usersTyping.length > 2 && (
          <span>Several people are typing...</span>
        )}
      </div>
    );
  };
  
export default AnyOneTypingComponent;