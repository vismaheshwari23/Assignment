import React, { useState, useEffect } from 'react';
import './InputBox.css';
import { SearchIcon } from '../../assests';

interface InputBoxProps {
  onSearch: (query: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchValue);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, onSearch]);

  return (
    <div>
      <input
        type="text"
        className="custom-input-box"
        placeholder="Search here"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="custom-input-button">
        <img src={SearchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default InputBox;