import React, { useContext, useState } from "react";
import { Themes } from "../../Theme/Theme";
import { ThemeContext } from "../../Context/ThemeContext";
import { DisplayButton,Circle, DropdownContent, Option } from "../StyledComponents/List";

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
    <div className="dropdown" style={{display:"inline-block"}}>
      <DisplayButton onClick={toggleDropdown}>
        <Circle/>
        {selectedTheme.name}
      </DisplayButton>
      {isOpen && (
        <DropdownContent>
          {Themes.map((theme) => (
             <Option key={theme.name} onClick={ ()=> {handleOptionClick(theme)}}>
              <Circle style={{backgroundColor: theme.colors[5]}}/>
              {theme.name}
             </Option>
           ))
          }
          </DropdownContent>   
      )}
    </div>
  );
};

export default CustomDropdown;
