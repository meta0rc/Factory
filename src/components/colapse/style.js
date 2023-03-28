import styled from "styled-components";

export const Container = styled.div`    
    background: #ebebeb; 
    padding: 10px;
    width: 1000px;
`
export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px; 
    height: 15px;
    border-radius: 4px;
    outline: none;
    background: ${props => {
        return props.disabled ? '#ccc' :
        props.active ? 'orange' : '#ffff';
    }}; 
    border: 1px solid ${props => props.disabled ? '#ccc' : 'orange'};
    color: ${props => {
        return props.disabled ? '333' :
        props.active ? '#fff' : 'orange'
    }}; 
    &:hover {
        border: 1px solid ${props => props.disabled ? '#ccc' : 'orange'};
        opacity: 0.7;
        cursor: pointer;
    }
`
export const ContainerExpanded = styled.div`
    padding: 10px;
`
export const ContainerControl = styled.div `
    display: flex;
    align-items: center;
`
export const Label = styled.span`
    font-weight: bold;
    font-size: 12px; 
    margin-left: 10px;
`