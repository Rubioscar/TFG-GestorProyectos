const normal = (issues) => {
    const board = {
        lanes: [
            {
              id: 'To do',
              title: 'TO DO',
              cards: issues.filter((issue) => issue.issue_status.name === "To do")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            },
            {
              id: 'In progress',
              title: 'IN PROGRESS',
              cards: issues.filter((issue) => issue.issue_status.name === "In progress")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            },
            {
              id: 'Done',
              title: 'DONE',
              cards: issues.filter((issue) => issue.issue_status.name === "Done")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            }
        ]
    }

    return board;    
};

const proyecto = (issues) => {
    const board = {
        lanes: [
            {
                id: 'Ready',
                title: 'READY',
                cards: issues.filter((issue) => issue.issue_status.name === "Ready")
                .map(issue => {
                  return {id: issue.id, objeto: issue}
                })
            },
            {
              id: 'To do',
              title: 'TO DO',
              cards: issues.filter((issue) => issue.issue_status.name === "To do")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            },
            {
              id: 'In progress',
              title: 'IN PROGRESS',
              cards: issues.filter((issue) => issue.issue_status.name === "In progress")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            },
            {
              id: 'Done',
              title: 'DONE',
              cards: issues.filter((issue) => issue.issue_status.name === "Done")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            },
            {
                id: 'Validated',
                title: 'VALIDATED',
                cards: issues.filter((issue) => issue.issue_status.name === "Validated")
                .map(issue => {
                  return {id: issue.id, objeto: issue}
                })
            }
        ]
    }

    return board;    
};

const duda = (issues) => {
    const board = {
        lanes: [
            {
              id: 'To do',
              title: 'TO DO',
              cards: issues.filter((issue) => issue.issue_status.name === "To do")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            },
            {
              id: 'In progress',
              title: 'IN PROGRESS',
              cards: issues.filter((issue) => issue.issue_status.name === "In progress")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            },
            {
              id: 'Question',
              title: 'QUESTION',
              cards: issues.filter((issue) => issue.issue_status.name === "Question")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            },
            {
              id: 'Done',
              title: 'DONE',
              cards: issues.filter((issue) => issue.issue_status.name === "Done")
              .map(issue => {
                return {id: issue.id, objeto: issue}
              })
            }
        ]
    }

    return board;
};

export const selectBoard = (type, issues) => {
    switch (type) {
        case "Proyecto":
            return proyecto(issues);
        case "Duda":
            return duda(issues);
        default:
            return normal(issues);        
    }
}