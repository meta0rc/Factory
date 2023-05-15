import { memo } from "react";
import { Checkbox } from "../checkbox/checkbox";
import {
  Button,
  Container,
  ContainerControl,
  ContainerExpanded,
  Label,
} from "./style";

const Collapse = ({
  active,
  children,
  onClick,
  text,
  disabled,
  checked,
  onCheck,
  subject,
}) => {
  const name = subjectType(subject);

  const handleClickCollapse = () => {
    onClick(subject, name);
  };

  const handleCheck = () => {
    onCheck(subject, name);
  };
  return (
    <Container key={name + subject.titulo}>
      <ContainerControl>
        <Button
          active={active}
          onClick={handleClickCollapse}
          disabled={disabled}
        >
          {active ? "-" : "+"}
        </Button>
        <Checkbox checked={checked} onClick={handleCheck} />
        <Label>{subject.titulo}</Label>
      </ContainerControl>
      {active && <ContainerExpanded>{children}</ContainerExpanded>}
    </Container>
  );
};

const subjectType = (subject) => {
  let subjectType = subject.idAssuntoObjeto
    ? "assuntos"
    : subject.idAssuntoTopico
    ? "assuntoObjetos"
    : "assuntoTopicos";

  return subjectType;
};
export default memo(Collapse);


const DEFAULT_TYPES_INITIAL_SUBJECTS = {
  assuntos: [],
  assuntoObjetos: [],
  assuntoTopicos: [],
};
