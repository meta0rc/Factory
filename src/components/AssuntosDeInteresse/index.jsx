import { useState } from "react";
import { Container } from "./style";
import Collapse from "../colapse/collapsible";
import subjects from "../../mocks/assuntos.json";
import useStateWithCallback from "../../hooks";

export const AssuntosDeInteresse = () => {
  const [expandedSubjects, setExpandedSubjects] = useState(
    DEFAULT_TYPES_INITIAL_SUBJECTS
  );
  const [selectedSubjects, setSelectedSubjects] = useStateWithCallback(
    DEFAULT_TYPES_INITIAL_SUBJECTS
  );

  const onChangeExpand = (subject, levelSubject) => {
    const { id: idSubject } = subject;
    if (expandedSubjects[levelSubject].includes(idSubject)) {
      return setExpandedSubjects((prev) => ({
        ...prev,
        [levelSubject]: prev[levelSubject].filter(
          (subject) => subject != idSubject
        ),
      }));
    }
    return setExpandedSubjects((prev) => ({
      ...prev,
      [levelSubject]: [...prev[levelSubject], idSubject],
    }));
  };

  const onCheckSubject = (subject, subjectType) => {
    if(subjectType == "assuntoTopicos") {
      onCheckSubjectTypeTopic(subject);
    }
  };

  const onCheckSubjectTypeTopic = (subject) => {
    const TMP_SUBJECTS = selectedSubjects
    
    TMP_SUBJECTS.assuntoTopicos = [...TMP_SUBJECTS.assuntoTopicos, ]
  }

  return (
    <Container>
      {subjects.map((assuntoTopico) => (
        <Collapse
          subject={assuntoTopico}
          onClick={onChangeExpand}
          active={expandedSubjects.assuntoTopicos.includes(assuntoTopico.id)}
          onCheck={onCheckSubject}
          checked={selectedSubjects.assuntoTopicos.includes(assuntoTopico.id)}
        >
          {assuntoTopico.assuntoObjetos.map((assuntoObjeto) => (
            <Collapse
              onClick={onChangeExpand}
              active={expandedSubjects.assuntoObjetos.includes(
                assuntoObjeto.id
              )}
              subject={assuntoObjeto}
              onCheck={onCheckSubject}
              checked={selectedSubjects.assuntoObjetos.includes(
                assuntoObjeto.id
              )}
            >
              {assuntoObjeto.assuntos &&
                assuntoObjeto.assuntos.map((assunto) => (
                  <Collapse
                    subject={assunto}
                    checked={selectedSubjects.assuntoObjetos.includes(
                      assunto.idAssuntoObjeto
                    ) || selectedSubjects.assuntos.includes(assunto.id)}
                    disabled
                    onCheck={onCheckSubject}
                  />
                ))}
            </Collapse>
          ))}
        </Collapse>
      ))}
    </Container>
  );
};

const DEFAULT_TYPES_INITIAL_SUBJECTS = {
  assuntos: [],
  assuntoObjetos: [],
  assuntoTopicos: [],
};