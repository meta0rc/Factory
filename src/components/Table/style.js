import styled from "styled-components";

export const ContainerTable = styled.div`
  table {
    box-shadow: 0 0 3px #ccc;
    border-radius: 4px;
  }
`;

const Tr = styled.tr`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 15px;
`;

export const HeaderTable = styled(Tr)`
  border-radius: 4px 4px 0 0;
  background: ${({ colorHeader }) =>
    colorHeader ? colorHeader : "rgb(164, 170, 181)"};
`;
export const TabHead = styled(Tr)`
  width: ${({ width }) => (width ? width : "100%")};
  color: #fff;
  text-align: ${({ headerAlign }) => (headerAlign ? headerAlign : "left")};
`;
export const RowData = styled(Tr)`
  
`;

export const TabData = styled(Tr)`
  width: ${({ width }) => (width ? width : "100%")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
