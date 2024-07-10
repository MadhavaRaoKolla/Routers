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
`