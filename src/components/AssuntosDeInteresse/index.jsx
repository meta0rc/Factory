import { Container } from "./style";
import Collapse from "../colapse/collapsible";
import subjects from "../../mocks/assuntos.json";
import { useFunctionsSubjects } from "./services";
import { useEffect } from "react";

export const AssuntosDeInteresse = () => {
  const { 
    onChangeExpand,
    onCheckSubject,
    onCheckSubjectObject,
    onCheckSubjectTopic,
    expandedSubjects,
    selectedSubjects,
    isCheckedTypeTopic,
    isCheckedTypeObject,
    getSubjectsSelecteds
  } = useFunctionsSubjects();
  
  const Selecteds = getSubjectsSelecteds();
  return (
    <Container>
      {subjects.map((assuntoTopico) => (
        <Collapse
          key={assuntoTopico.titulo + assuntoTopico.id}
          subject={assuntoTopico}
          onClick={onChangeExpand}
          active={expandedSubjects.assuntoTopicos.includes(assuntoTopico.id)}
          onCheck={onCheckSubjectTopic}
          checked={isCheckedTypeTopic(assuntoTopico)}
        >
          {assuntoTopico.assuntoObjetos && assuntoTopico.assuntoObjetos.map((assuntoObjeto) => (
            <Collapse
              key={assuntoObjeto.titulo + assuntoObjeto.id}
              onClick={onChangeExpand}
              active={expandedSubjects.assuntoObjetos.includes(
                assuntoObjeto.id
              )}
              subject={assuntoObjeto}
              onCheck={onCheckSubjectObject}
              checked={isCheckedTypeObject(assuntoObjeto)}

            >
              {assuntoObjeto.assuntos &&
                assuntoObjeto.assuntos.map((assunto) => (
                  <Collapse
                    key={assunto.titulo + assunto.id}
                    subject={assunto}
                    checked={
                      selectedSubjects.assuntoObjetos.includes(
                        assunto.idAssuntoObjeto
                      ) || selectedSubjects.assuntos.includes(assunto.id)
                    }
                    disabled
                    onCheck={onCheckSubject}
                  />
                ))}
            </Collapse>
          ))}
        </Collapse>
      ))}
      <Container>
          {Selecteds.map(assunto => assunto.titulo)}
      </Container>
    </Container>
  );
};