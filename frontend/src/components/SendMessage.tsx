import { useState } from "react";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
    setValue("");
  };
  return (
    <div className="bg-gray-200 fixed bottom-0 w-full py-4 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
      </form>
      <button className="w-auto bg-gray-500 text-fuchsia-950 rounded-r-lg px-5">Send</button>
    </div>
  )
};

export default SendMessage;
