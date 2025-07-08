import React, { useState } from "react";
import { useJobTrie } from "../hooks/useTrie";

const AutoSuggest = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);

  const { suggest, loading } = useJobTrie();

  const handleChange = async (e) => {
    const val = e.target.value;
    setInput(val);
    setShow(true);

    if (val.length == 0) {
      setSuggestions([]);
      return;
    }
    if (!loading) {
      const result = suggest(val);
      setSuggestions(result);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "ArrowDown") {
      setActive((prev) => (prev + 1) % suggestions.length);
    } else if (e.key == "ArrowUp") {
      setActive((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key == "Enter") {
      const selected = suggestions[active] || input;
      setInput(selected);
      setShow(false);
      onSearch(`search=${selected}`);
    }
  };
  const handleClick = (word) => {
    setInput(word);
    setShow(false);
    onSearch(`search=${word}`);
  };

  return (
    <div className="relative w-full sm:w-1/2">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search job titles"
        className="w-full px-4 py-2 rounded-lg border shadow-sm focus:outline-none"
      />
      {show && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((word, indx) => (
            <li
              key={word}
              onClick={() => handleClick(word)}
              className={`px-4 py-2 cursor-pointer ${
                active == indx ? "bg-blue-100" : ""
              } hover:bg-blue-50`}
            >
              {word}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggest;
