export const transformResposeSubjectToObjectProps = (resposneSubjects) => {
    let OBJECT_FORMATED_SUBJECT = DEFAULT_TYPES_INITIAL_SUBJECTS
    resposneSubjects.map(assuntoTopico => {
        OBJECT_FORMATED_SUBJECT.assuntoTopicos.push(assuntoTopico)
        if (assuntoTopico.assuntoObjetos) {
            assuntoTopico.assuntoObjetos.map(assuntoObjeto => {
                OBJECT_FORMATED_SUBJECT.assuntoObjetos.push(assuntoObjeto)
                if (assuntoObjeto.assuntos) {
                    assuntoObjeto.assuntos.map(assunto => {
                        OBJECT_FORMATED_SUBJECT.assuntos.push(assunto)
                    })
                }
            })

        }
    })
    return OBJECT_FORMATED_SUBJECT
}

export const DEFAULT_TYPES_INITIAL_SUBJECTS = {
    assuntos: [],
    assuntoObjetos: [],
    assuntoTopicos: [],
};

export const isNull = (prop) => {
    if (!prop || !prop.length) return true;
    return false
}

export const concatenateArrays = (obj) => {
    const concatenatedArray = [];
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            concatenatedArray.push(...obj[key]);
        }
    }
    return concatenatedArray;
};