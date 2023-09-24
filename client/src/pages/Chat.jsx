import { useStateValue } from "../context/StateProvider";
import { useEffect, useState } from "react";
import "../App.css";
import { saveItem } from "../utils/firebase-functions";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase-config";

const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = "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";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

configuration.baseOptions.headers = {
  Authorization:
    "Bearer " + "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",
};

const openai = new OpenAIApi(configuration);

export async function sendMessageToOpenAI(message) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `act as Conversational Fashion Outfit generator for ${message}`,
      },
    ],
    max_tokens: 150,
  });
  console.log(response.data.choices[0].message);
  return response.data.choices[0].message.content;
}

export async function sendMessage(message) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${message}`,
      },
    ],
    max_tokens: 150,
  });
  console.log(response.data.choices[0].message);
  return response.data.choices[0].message.content;
}

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  const [generatedImageUrl, setGeneratedImageUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/test-b5368.appspot.com/o/testimg.jpg?alt=media&token=5e5892e7-3743-4a3f-92d7-e225222117eb"
  );
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [botIsGenerating, setBotIsGenerating] = useState(false);
  const [oldData, setOldData] = useState([]);

  useEffect(() => {
    onSnapshot(doc(firestore, "images", user.uid), (doc) => {
      if (doc.exists()) {
        return setOldData(doc.data().images);
      } else {
        console.log("No such document!");
      }
    });
  }, [user.uid, firestore]);

  const saveDetails = async (url) => {
    const data = {
      id: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      images: [...oldData, url],
    };
    console.log(data);

    console.log(data);
    await setDoc(doc(firestore, "images", user.uid), data, {
      merge: true,
    });
  };

  const handleMessageSubmit = async () => {
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");
    setBotIsTyping(true);
    const response = await sendMessageToOpenAI(input);
    setBotIsTyping(false);
    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: response, isUser: false },
    ]);
    setInput("");
  };

  const handleMessageSubmitForChat = async () => {
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");
    setBotIsTyping(true);
    const response = await sendMessage(input);
    setBotIsTyping(false);
    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: response, isUser: false },
    ]);
    setInput("");
  };

  const handleImageGenerate = async () => {
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");
    setBotIsGenerating(true);
    try {
      const generateResponse = await fetch(
        "https://outfitter-backend.onrender.com/generate-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: await sendMessageToOpenAI(input),
          }),
        }
      );
      const generateData = await generateResponse.json();
      const inferenceId = generateData.id;
      console.log(inferenceId);

      if (inferenceId) {
        const getImageResponse = await fetch(
          `https://outfitter-backend.onrender.com/get-image/37d42ae9-5f5f-4399-b60b-014d35e762a5/${inferenceId}`
        );
        const getImageData = await getImageResponse.json();
        const imageUrl = getImageData.imageUrl;

        saveDetails(imageUrl);
        setGeneratedImageUrl(imageUrl);

        setMessages([
          ...messages,
          { text: input, isUser: true },
          { imageUrl, isImage: true, isUser: false },
        ]);
        setInput("");
        setBotIsGenerating(false);
      } else {
        console.error("Error generating image");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const openInNewTab = (url) => {
    window.open(
      `https://lens.google.com/uploadbyurl?url=${url}`,
      "_blank",
      "noreferrer"
    );
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 scrollbar-y-hidden">
      <div
        className={`flex flex-col items-start justify-start h-2/3 p-4 ${
          messages.length > 0 ? "overflow-y-scroll scrollbar-hide" : ""
        }`}
      >
        {messages.length === 0 ? (
          <h1 className="text-white text-center py-10 text-2xl">
            Let's Generate Awesome Outfit For You
          </h1>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.isUser
                  ? "bg-gray-700 max-w-[50%] text-white self-end p-3 mx-1 my-2 rounded-[10px]"
                  : "bg-gray-600 max-w-[50%] text-white self-start p-3 mx-1 my-2 rounded-[10px]"
              }`}
            >
              {message.isImage ? (
                <div>
                  <img src={message.imageUrl} alt="Displayed" />
                  <div class="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
                    <button
                      onClick={() => {
                        window.open(
                          `https://lens.google.com/uploadbyurl?url=${message.imageUrl}`,
                          "_blank",
                          "noreferrer"
                        );
                      }}
                      class="text-lg font-bold text-gray-800 lg:text-xl"
                    >
                      Shop Similar
                    </button>
                  </div>
                </div>
              ) : (
                message.text
              )}
            </div>
          ))
        )}
        {botIsTyping && (
          <div class="bg-gray-800 max-w-[50%] text-white self-start p-2 mx-1 my-2 rounded-[10px] typing-animation">
            Bot is typing...
          </div>
        )}
        {botIsGenerating && (
          <div class="bg-gray-800 max-w-[50%] text-white self-start p-2 mx-1 my-2 rounded-[10px] generating-animation">
            Bot is Generating...
          </div>
        )}
      </div>
      <div class="input-container flex justify-center items-center w-full h-1/5 p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          class="w-3/4 h-1/3 p-2 border rounded-md border-green-500 outline-none"
        />
        <button
          onClick={handleMessageSubmitForChat}
          class="ml-2 h-1/3 px-4 py-2ounded-md border border-none outline-none bg-blue-500 cursor-pointer text-white rounded-md hover:opacity-60"
        >
          Chat
        </button>
        <button
          onClick={handleImageGenerate}
          class="ml-2 h-1/3 px-4 py-2ounded-md border border-none outline-none bg-blue-500 cursor-pointer text-white rounded-md hover:opacity-60"
        >
          Image
        </button>
      </div>
    </div>
  );
}

export default Chat;
