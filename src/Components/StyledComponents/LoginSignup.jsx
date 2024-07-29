import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loginbox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 40%;
  height: 50vh;
  width: 22rem;
  padding: 0 4rem;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(7, 7, 7, 0.5);
  border: 1px solid #ccc;
  background-color: ${({ theme }) => theme.loginSignupForm};
  @media (max-width: 440px) {
    width: 18rem;
    padding: 20px;
  }
`;

export const Button = styled.button`
  padding: 8px;
  margin-bottom: 5px;
  background-color: #3a7bd5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 400px) {
    padding: 5px;
    margin-top: 5px;
  }
`;

export const Signup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(7, 7, 7, 0.5);
  border: 1px solid #bfbbbb;
  background-color: ${({ theme }) => theme.loginSignupForm};
`;

export const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
  color: ${({ theme }) => theme.fontColor};
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.fontColor};
`;

export const StyleLink = styled(Link)`
  padding: 1rem 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.fontColor};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.hover};
  }
`;

export const Formgroup = styled.div`
  color: ${({ theme }) => theme.fontColor};
`;
