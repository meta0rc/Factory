import styled from "styled-components";

export const Button = styled.button`
    width: 15px; 
    height: 15px;
    background: ${props => props.checked ? '#333' : '#ffff'}; 
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-left: 5px;
    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`