import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navbar = styled.div`
    padding: 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #7f7d7d;
    height: 4rem;
    width: 100%;
    background-color: var(--color-5);  
`;

export const Title = styled.h1`
    color:var(--color-7);
    font-size: 2rem;
`;

export const Button = styled.button`
    font-family: Noto Sans;
    background: transparent;
    border: none;
    padding: 0 10px;
`;

export const Image = styled.img`
    height: 2rem;
    width: 2.2rem;
    padding: 3px 1px 0 1px;
    &:hover{
        cursor: pointer;
    }
`;

export const StyledLink = styled(Link)`
    margin-left: 1rem;
    text-decoration: none;
    padding: 3px;
    font-size: 1.5rem;
    color: var(--color-7);
    &:hover{
        color:var(--color-6);
    }
`;