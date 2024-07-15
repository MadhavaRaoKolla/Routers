import React from "react";
import { Link } from "react-router-dom";
import "./Error.scss";
import styled from "styled-components";
import { Title } from "../../Components/StyledComponents/LoginSignup";

const Error = () => {
  return (
    <div className="error">
      <Title>I dont have that page</Title>
      <StyledLink to="/">Click here</StyledLink>
    </div>
  );
};

const StyledLink = styled(Link)`
  padding: 10px;
  border-radius: 5px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.fontColor};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.hover};
  }
`;

export default Error;
