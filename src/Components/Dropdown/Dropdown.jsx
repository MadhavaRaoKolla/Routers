import React, { useContext, useState } from "react";
import "./Dropdown.scss";
import { Themes } from "../../Theme/Theme";
import { ThemeContext } from "../../Context/ThemeContext";
import { DisplayButton,Circle } from "../StyledComponents/List";

const CustomDropdown = () => {
  
  const [selectedTheme, setSelectedTheme] = useState(Themes[0]);
  const [isOpen, setIsOpen] = useState(false);
  const {handleTheme} = useContext(ThemeContext);

  const handleOptionClick = (theme) => {
    setSelectedTheme(theme);
    handleTheme(theme.colors);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <DisplayButton onClick={toggleDropdown}>
        <Circle/>
        {selectedTheme.name}
      </DisplayButton>
      {isOpen && (
        <div className="dropdown-content">
          {Themes.map((theme) => (
            <div key={theme.name} className="option" onClick={() => handleOptionClick(theme)}>
             <Circle style={{ backgroundColor: theme.colors[5] }}/>
             {theme.name}
            </div>
           ))
          }
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
