import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loginbox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 3rem;
    height: 45vh;
    width: 26rem;
    padding: 0 2rem;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(7, 7, 7, 0.5);
    border: 1px solid #ccc;
    background-color:var(--color-3);
`;

export const Button = styled.button`
    padding: 10px;
    background-color: #3a7bd5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    width: 5rem;
    text-align: center;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

export const Signup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(7, 7, 7, 0.5);
  border: 1px solid #bfbbbb;
  background-color:var(--color-3);
`;

export const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    margin: 1rem 0;
    color: var(--color-7);
`;

export const Label = styled.label`
    margin-bottom: .5rem;
    font-size: 1.2rem;
    color: var(--color-7);
`;

export const StyleLink = styled(Link)`
    padding: 1rem 0;
    font-size: 1.2rem;
    color: var(--color-7);
    text-decoration: none;
    &:hover{
        color:var(--color-6);
    }
`;

export const Formgroup = styled.div`
    color: var(--color-7);
`;