import styled from "styled-components";

export const Data = styled.form`
  background-color: ${({ theme }) => theme.loginSignupForm};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0px 5px ${({ theme }) => theme.fontColor};
  height: 35rem;
  width: 25rem;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;

export const P = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 0.7rem;
  text-align: center;
  color: ${({ theme }) => theme.fontColor};
`;

export const Label = styled.label`
  margin-bottom: 0.3rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.fontColor};
`;

export const Info = styled.div`
  background-color: ${({ theme }) => theme.itemBg};
  padding: 6px 1rem;
  width: 25rem;
  border-radius: 5px;
  box-shadow: 0 0px 5px ${({ theme }) => theme.fontColor};
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
  @media (max-width: 485px) {
    width: 20rem;
  }
`;

export const ItemP = styled.p`
  margin-bottom: 5px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.fontColor};
`;
