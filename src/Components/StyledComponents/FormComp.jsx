import styled from "styled-components";

export const Data = styled.div`
    background-color:var(--color-3);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 0px 5px var(--color-7);
    width: 30rem;
    height: 35rem;
    display: flex;
    flex-direction: column;
    margin: 0rem 1rem;
`;

export const P = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 0.7rem;
    text-align: center;
    color: var(--color-7);
`;

export const Label = styled.label`
    margin-bottom: 0.3rem;
    font-size: 1.2rem;
    color: var(--color-7);
`;

export const Info = styled.div`
    background-color: var(--color-4);    
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0px 5px var(--color-7);
    margin-bottom: 1rem;
    transition: transform 0.3s ease;

    &:hover{
      transform: scale(1.02);
    }
`;

export const ItemP = styled.p`
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: var(--color-7);
`