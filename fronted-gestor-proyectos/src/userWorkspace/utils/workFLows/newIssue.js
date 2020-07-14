const proyecto = () => {
    return [
        { id:"To do", value:"To do"},
        { id:"Ready", value:"Ready"},
        { id:"In progress", value:"In progress"},
        { id:"Done", value:"Done"},
        { id:"Validated", value:"Validated"},
    ]
}

const duda = () => {
    return [
        { id:"To do", description:"To do"},
        { id:"In progress", description:"In progress"},
        { id:"Done", description:"Done"},
        { id:"Question", description:"Question"},
    ]
}

const normal = () => {
    return [
        { id:"To do", description:"To do"},
        { id:"In progress", description:"In progress"},
        { id:"Done", description:"Done"}
    ]
}

export const statusDisponibles = (type) => {
    switch (type) {
        case "Proyecto":
            return proyecto();
        case "Duda":
            return duda();
        default:
            return normal();        
    }
}