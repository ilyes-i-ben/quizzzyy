export const questions = [
    {
        "id": 1,
        "text": "Qu'est-ce que JavaScript?",
        "type": "radio",
        "options": [
            { "id": "a", "text": "Un langage de programmation", "correct": true },
            { "id": "b", "text": "Un langage de balisage", "correct": false },
            { "id": "c", "text": "Une base de données", "correct": false },
            { "id": "d", "text": "Un système d'exploitation", "correct": false }
        ]
    },
    {
        "id": 2,
        "text": "Lesquels parmi ces éléments sont des frameworks ou bibliothèques JavaScript? (Sélectionnez toutes les réponses correctes)",
        "type": "checkbox",
        "options": [
            { "id": "a", "text": "React", "correct": true },
            { "id": "b", "text": "Angular", "correct": true },
            { "id": "c", "text": "Python", "correct": false },
            { "id": "d", "text": "Vue", "correct": true }
        ]
    },
    {
        "id": 3,
        "text": "Que signifie DOM en JavaScript?",
        "type": "text",
        "correctAnswer": "Document Object Model"
    },
    {
        "id": 4,
        "text": "Quelle méthode JavaScript est utilisée pour sélectionner un élément par son ID?",
        "type": "radio",
        "options": [
            { "id": "a", "text": "document.getElement(id)", "correct": false },
            { "id": "b", "text": "document.getElementById(id)", "correct": true },
            { "id": "c", "text": "document.querySelector(#id)", "correct": false },
            { "id": "d", "text": "element.findById(id)", "correct": false }
        ]
    },
    {
        "id": 5,
        "text": "Comment déclarer une variable constante en JavaScript moderne?",
        "type": "radio",
        "options": [
            { "id": "a", "text": "var x = 5;", "correct": false },
            { "id": "b", "text": "let x = 5;", "correct": false },
            { "id": "c", "text": "const x = 5;", "correct": true },
            { "id": "d", "text": "constant x = 5;", "correct": false }
        ]
    }
]
