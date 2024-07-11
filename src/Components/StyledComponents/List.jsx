import styled from "styled-components";

export const DisplayButton = styled.div`
      background-color: var(--color-0);
      padding: 2px 5px;
      border: 1px solid var(--color-7);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 1rem;
      border-radius: 5px;
      color: var(--color-7);
`;

export const Circle = styled.div`
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid var(--color-7);
      background-color: var(--color-5);
`;

export const DropdownContent = styled.div`
      position: absolute;
      background-color: var(--color-0);
      border: 1px solid var(--color-7);
      border-bottom: none;
`;

export const Option = styled.div`
      padding: 2px 2px;
      cursor: pointer;
      border-bottom: 1px solid var(--color-7);
      display: flex;
      align-items: center;
      gap: 2px;
      color: var(--color-7);
      &:hover {
        background-color: #aca6a6;
      }
`;