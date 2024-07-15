import React, { useContext, useState } from "react";
import { Themes } from "../../Theme/Theme";
import { ThemeContext } from "../../Context/ThemeContext";
import {
  DisplayButton,
  Circle,
  DropdownContent,
  Option,
} from "../StyledComponents/List";

const CustomDropdown = () => {
  const [selectedTheme, setSelectedTheme] = useState("Orange"); //to display on navbar
  const [isOpen, setIsOpen] = useState(false);
  const { handleTheme } = useContext(ThemeContext); //passing theme for styling

  const handleOptionClick = (themeName) => {
    setSelectedTheme(themeName);
    handleTheme(themeName);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" style={{ display: "inline-block" }}>
      <DisplayButton onClick={toggleDropdown}>
        <Circle />
        {selectedTheme}
      </DisplayButton>
      {isOpen && (
        <DropdownContent>
          {Object.keys(Themes).map((themeName) => (
            <Option
              key={themeName}
              onClick={() => {
                handleOptionClick(themeName);
              }}
            >
              <Circle
                style={{ backgroundColor: Themes[themeName].navBackground }}
              />
              {themeName}
            </Option>
          ))}
        </DropdownContent>
      )}
    </div>
  );
};

export default CustomDropdown;
