import styled from "styled-components";

export const DisplayButton = styled.div`
  background-color: ${(props) => props.theme.bodyBackground};
  padding: 2px 5px;
  border: 1px solid ${({ theme }) => theme.fontColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.fontColor};
`;

export const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.navBackground};
`;

export const DropdownContent = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.bodyBackground};
  border: 1px solid ${({ theme }) => theme.fontColor};
  border-bottom: none;
  cursor: pointer;
`;

export const Option = styled.div`
  padding: 2px 2px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.fontColor};
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.fontColor};
  &:hover {
    background-color: #aca6a6;
  }
`;
