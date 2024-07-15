import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body{
    height: 100vh;
    font-family: Noto Sans;
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.bodyBackground};
  }
`;

export default GlobalStyles;
