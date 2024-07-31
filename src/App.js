import { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const surpriseOptions = [
    'who won the latest Nobel peace prize',
    'where does pizza come from',
    "how do you make a BLT sandwich"
  ];

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Please ask a question");
      return;
    }
    setError("");
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/gemini`, options);

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const data = await response.text();

      setChatHistory(oldChatHistory => [...oldChatHistory, {
        role: "user",
        part: value
      }, {
        role: 'model',
        part: data
      }]);

      setValue("");
    } catch (error) {
      console.error("Error in getResponse:", error);
      setError(`Something went wrong: ${error.message}`);
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  return (
    <div className='app'>
      <p>
        What do you want to know
        <button className='surprise' onClick={surprise}>Surprise me</button>
      </p>
      <div className="input-container">
        <input 
          value={value} 
          placeholder="Ask me anything" 
          onChange={(e) => setValue(e.target.value)} 
        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <p className="answer">{chatItem.role}: {chatItem.part}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;



