import { useEffect, useState } from "react";
import resposneSubjects from "../../mocks/assuntos.json"
import { DEFAULT_TYPES_INITIAL_SUBJECTS, concatenateArrays, isNull, transformResposeSubjectToObjectProps } from "./utils";

export const useFunctionsSubjects = () => {
    /**
     * @description Componente v3 de assuntos de interesse aplicando principios de responsábilidades para funções.
     */
    const [expandedSubjects, setExpandedSubjects] = useState(
        DEFAULT_TYPES_INITIAL_SUBJECTS
    );
    const [selectedSubjects, setSelectedSubjects] = useState(
        DEFAULT_TYPES_INITIAL_SUBJECTS
    );

    const isCheckedTypeObject = (subject) => {
        if (!subject.assuntos && selectedSubjects.assuntoObjetos.includes(subject.id)) return true;
        if (subject.assuntos) {
            return subject.assuntos.some(assunto => selectedSubjects.assuntos.includes(assunto.id))
        }
    }

    const isCheckedTypeTopic = (subject) => {
        if (selectedSubjects.assuntoTopicos.includes(subject.id)) return true;
        if (subject.assuntoObjetos) {
            const childrensFromSubjectSelectds = getChildrensSelectedsFromTopic(subject)
            return Boolean(childrensFromSubjectSelectds);
        }

    }
    const handleClear = (subject, subjectType) => {
        setSelectedSubjects(prev => ({
            ...prev,
            [subjectType]: prev[subjectType].filter(subjectId => subjectId != subject.id)
        }))
    }

    const handleClearChildrensObjects = (subjectObject) => {
        const subjectsChildrens = getChildrensFromSubject(subjectObject);
        setSelectedSubjects(prev => ({
            ...prev,
            assuntos: prev.assuntos.filter(assuntoId => !subjectsChildrens.includes(assuntoId))
        }))
    }

    const handleClearChildrensTopics = (subjectsChildrens) => {
        setSelectedSubjects(prev => ({
            ...prev,
            assuntoObjetos: prev.assuntoObjetos.filter(assuntoId => !subjectsChildrens.assuntoObjetos.includes(assuntoId)),
            assuntos: prev.assuntos.filter(assuntoId => !subjectsChildrens.assuntos.includes(assuntoId))
        }))
    }

    const handleAddSubject = (subject, subjectType, shouldAdd = true) => {
        if (!subjectType || !selectedSubjects[subjectType]) return;
        if (selectedSubjects[subjectType].includes(subject.id)) {
            handleClear(subject, subjectType);
            return;
        }

        if (!shouldAdd) return;

        setSelectedSubjects(prev => ({
            ...prev,
            [subjectType]: [...prev[subjectType], subject.id]
        }))
    }

    const onCheckSubject = (subject, subjectType) => handleAddSubject(subject, subjectType)

    const onCheckSubjectObject = (assuntoObjeto, subjectType, assuntoTopico) => {
        let shouldSkip = false
        if (isNull(assuntoObjeto.assuntos)) return handleAddSubject(assuntoObjeto, subjectType);

        assuntoObjeto.assuntos.map(assunto => {
            if (selectedSubjects.assuntos.includes(assunto.id)) {
                shouldSkip = true
                handleClearChildrensObjects(assuntoObjeto);
            }
            else {
                !shouldSkip && onCheckSubject(assunto, "assuntos");
            }
        });
    }

    const onCheckSubjectTopic = (subject, subjectType) => {
        if (isNull(subject.assuntoObjetos)) return handleAddSubject(subject, subjectType);

        const childrensClear = getChildrensSelectedsFromTopic(subject)

        if (childrensClear) {
            handleClearChildrensTopics(childrensClear);
            return;
        }
        subject.assuntoObjetos.map(assuntoObjeto => onCheckSubjectObject(assuntoObjeto, "assuntoObjetos"))
    }

    const getChildrensSelectedsFromTopic = (assuntoTopico) => {
        const childrensFromTopics = getChildrensFromTopics(assuntoTopico)
        const childrensSelecteds = selectedSubjects.assuntos.some(assunto => childrensFromTopics.assuntos.includes(assunto))
            || selectedSubjects.assuntoObjetos.some(assunto => childrensFromTopics.assuntoObjetos.includes(assunto))

        if (childrensSelecteds) return childrensFromTopics;

        return null;
    }

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

    const getChildrensFromSubject = (assuntoObjeto) => {
        const SUBJECTS_CHILDS_TMP = [];

        assuntoObjeto.assuntos.map(assunto => SUBJECTS_CHILDS_TMP.push(assunto.id))

        return SUBJECTS_CHILDS_TMP;
    }

    const getChildrensFromTopics = (assuntoTopico) => {
        let SUBJECTS_CHILDS_TMP = DEFAULT_TYPES_INITIAL_SUBJECTS;
        assuntoTopico.assuntoObjetos.map(assuntoObjeto => {
            if (isNull(assuntoObjeto.assuntos)) {
                SUBJECTS_CHILDS_TMP = {
                    ...SUBJECTS_CHILDS_TMP,
                    assuntoObjetos: [...SUBJECTS_CHILDS_TMP.assuntoObjetos, assuntoObjeto.id]
                }
            }
            else {
                assuntoObjeto.assuntos.map(assunto => {
                    SUBJECTS_CHILDS_TMP = {
                        ...SUBJECTS_CHILDS_TMP,
                        assuntos: [...SUBJECTS_CHILDS_TMP.assuntos, assunto.id]
                    }
                })
            }
        })
        return SUBJECTS_CHILDS_TMP;
    }

    const getSubjectsSelecteds = () => {
        const assuntosTmp = []
        resposneSubjects.map(assuntoTopico => {
            "assuntoObjetos" in assuntoTopico && assuntoTopico.assuntoObjetos.map(assuntoObjeto => {
                "assuntos" in assuntoObjeto && assuntoObjeto.assuntos.map(assunto => {
                    if(selectedSubjects.assuntos.includes(assunto.id)) {
                        assuntosTmp.push(assunto)
                    }
                })
            })
        })

        return assuntosTmp
    }

    return {
        onChangeExpand,
        expandedSubjects,
        selectedSubjects,
        onCheckSubject,
        onCheckSubjectObject,
        onCheckSubjectTopic,
        isCheckedTypeObject,
        isCheckedTypeTopic,
        getSubjectsSelecteds
    }
}