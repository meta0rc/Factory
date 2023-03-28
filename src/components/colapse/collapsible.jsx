import { useState } from "react"
import { Checkbox } from "../checkbox/checkbox"
import { Button, Container, ContainerControl, ContainerExpanded, Label } from "./style"

export const Collapse = ({active, children, onClick, text, disabled, checked, onCheck}) => {
  return (
    <Container>
      <ContainerControl>
        <Button active={active} onClick={onClick} disabled={disabled}>
          {active ? '-' : '+'}
        </Button>
        <Checkbox checked={checked} onClick={onCheck}/>
        <Label>
          { text }
        </Label>
      </ContainerControl>
      {active &&  (
        <ContainerExpanded>
          { children }
        </ContainerExpanded>
      )}
    </Container>
  )
}