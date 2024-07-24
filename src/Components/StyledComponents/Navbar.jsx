import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navbar = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #7f7d7d;
  height: 4rem;
  background-color: ${({ theme }) => theme.navBackground};

  @media (max-width: 450px) {
    height: 3.5rem;
  }
  @media (max-width: 415px) {
    padding: 5px;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.fontColor};
  font-size: 2rem;
`;

export const Button = styled.button`
  font-family: Noto Sans;
  background: transparent;
  border: none;
  padding: 0 10px;
  align-items: center;
`;

export const Image = styled.img`
  height: 2rem;
  width: 2.2rem;
  padding: 3px 1px 0 1px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 515px) {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

export const StyledLink = styled(Link)`
  margin-left: 10px;
  text-decoration: none;
  padding: 3px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.fontColor};
  &:hover {
    color: ${({ theme }) => theme.hover};
  }
  @media (max-width: 434px) {
    padding: 0 3px;
  }
`;
