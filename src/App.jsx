import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  document.body.style.backgroundColor = "#1E3A8A"; // Set background color
  // Password Generation Logic
  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+[]{}|;:,<.>/?`~";

    let generatedPassword = "";
    for (let i = 1; i <= length; i++) {
      const random = Math.floor(Math.random() * str.length);
      generatedPassword += str.charAt(random);
    }
    setPassword(generatedPassword);
  }, [length, numAllowed, charAllowed]);

  // Copy to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // Trigger generator on mount and when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center p-8 font-sans">
      <h1 className="text-5xl font-extrabold text-blue-400 text-center mb-12 tracking-wide uppercase">
        Password Generator
      </h1>
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl px-10 py-10 flex flex-col items-center">
        <div className="flex shadow-sm rounded-lg overflow-hidden mb-8 w-full max-w-lg">
          <input
            type="text"
            ref={passwordRef}
            value={password}
            className="w-full px-6 py-4 text-2xl text-gray-800 outline-none bg-gray-100"
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 text-white px-8 py-4 text-lg font-semibold hover:bg-blue-600 transition"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-lg">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-lg font-semibold text-gray-700">
              Length: <span className="text-blue-600 font-bold">{length}</span>
            </label>
            <input
              id="length"
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3 ml-4 cursor-pointer accent-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="text-lg font-semibold text-gray-700">
              Include Numbers
            </label>
            <input
              id="numberInput"
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed(prev => !prev)}
              className="cursor-pointer accent-blue-500 w-6 h-6"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="text-lg font-semibold text-gray-700">
              Include Symbols
            </label>
            <input
              id="characterInput"
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="cursor-pointer accent-blue-500 w-6 h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;