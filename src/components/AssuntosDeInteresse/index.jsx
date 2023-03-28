import { useState } from "react";
import { Collapse } from "../colapse/collapsible";
import { Container } from "./style";

export const AssuntosDeInteresse = ({ assuntos }) => {
  const [assuntosExpandidos, setAssuntosExpandidos] = useState([]);
  const [assuntosSelecionados, setAssuntosSelecionados] = useState({
    assuntos: [],
    assuntoObjetos: [],
    assuntoTopicos: [1],
  });

  const onExpanded = (assunto) => {
    if (assuntosExpandidos.includes(assunto)) {
      return setAssuntosExpandidos((prev) =>
        prev.filter((item) => item != assunto)
      );
    }
    setAssuntosExpandidos((prev) => [...prev, assunto]);
  };
  console.log(assuntosSelecionados)
  const checkAssuntoTopico = (assuntoReceived, type) => {
    const assunto = verifyHaveChilds(assuntoReceived, type);
    const tempAssuntos = assuntosSelecionados[assunto.type]
    if (assuntosSelecionados[assunto.type].includes(assuntoReceived.id)) {
      setAssuntosSelecionados(prev => { 
        return {
          ...prev,
          [assunto.type]: tempAssuntos.filter(item => item != assuntoReceived.id)
        };
      });
    }
    else {
      setAssuntosSelecionados(prev => {
          return {
              ...prev,
              [assunto.type]: [...assuntosSelecionados[assunto.type], assunto.subjects.id]
          }
      })
    }
  };

  const verifyHaveChilds = (subject, type) => {
    let childs = {
      type: "assuntos",
      subjects: [],
    };
    if (type === "assuntoTopicos") {
      if (!subject.assuntoObjetos.length) {
        return childs = {
          type: "assuntoTopicos",
          subjects: [...childs.subjects, subject],
        };
      } else {
        subject.assuntoObjetos.map((assuntoObjeto) => {
          if (!assuntoObjeto.assuntos.legth) {
           return childs = {
              type: "assuntoObjetos", 
              subjects: [...childs.subjects, assuntoObjeto]
            }            
          } else {
            assuntoObjeto.assuntos.map((assunto) => {
              return childs = {
                ...childs,
                subjects: [...childs.subjects, assunto],
              };
            });
          }
        });
      }
    }
  };
  return (
    <Container>
      {assuntos.map((assuntoTopico) => (
        <Collapse
          text={assuntoTopico.titulo}
          onClick={() => onExpanded(assuntoTopico)}
          active={assuntosExpandidos.includes(assuntoTopico)}
          onCheck={() => checkAssuntoTopico(assuntoTopico, 'assuntoTopicos')}
          checked={assuntosSelecionados['assuntoTopicos'].includes(assuntoTopico.id)}
        >
          {assuntoTopico.assuntoObjetos.map((assuntoObjeto) => (
            <Collapse
              text={assuntoObjeto.titulo}
              onClick={() => onExpanded(assuntoObjeto)}
              active={assuntosExpandidos.includes(assuntoObjeto)}
              onCheck={() => checkAssuntoTopico(assuntoObjeto, 'assuntoObjetos')}
              checked={assuntosSelecionados['assuntoObjetos'].includes(assuntoObjeto.id)}

            >
              {assuntoObjeto.assuntos.map((assunto) => (
                <Collapse 
                    checked={assuntosSelecionados['assuntos'].includes(assunto.id)}
                    text={assunto.titulo} 
                    disabled></Collapse>
              ))}
            </Collapse>
          ))}
        </Collapse>
      ))}
    </Container>
  );
};
