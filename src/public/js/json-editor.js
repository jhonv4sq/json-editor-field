// Verifica si el valor es un object
const checkIfOject = (value) => {
    if (Array.isArray(value)) {
        return false
    } else if (typeof value === 'object' && value !== null) {
        return true
    } else if (typeof value === 'string') {
        return 'string'
    } else if (typeof value === 'number') {
        return 'number'
    } else {
        return 'unknown'
    }
}

// Muestra los json
const printOjectValue = (key, value, child = '') => {
    let div = document.createElement('div')
    div.classList.add(`json-editor-field__content${child}`)

    let spanKey = document.createElement('span')
    spanKey.classList.add('json-editor-field__content-key')
    let textKey = document.createTextNode(`${key} :`)
    spanKey.appendChild(textKey)
    div.appendChild(spanKey)

    if (['string', 'number'].includes(checkIfOject(value))) {
        let spanValue = document.createElement('span')
        let textValue = document.createTextNode(`${value}`)

        if (checkIfOject(value) == 'string') {
            spanValue.classList.add('json-editor-field__content-value-string')
        }

        if (checkIfOject(value) == 'number') {
            spanValue.classList.add('json-editor-field__content-value')
        }

        spanValue.appendChild(textValue)
        div.appendChild(spanValue)
    }

    if (checkIfOject(value) == false) {
        let divValue = document.createElement('div')
        divValue.classList.add('json-editor-field__content-array')

        value.forEach((v) => {
            let divArray = printArrayValue(v, '-child')
            divValue.appendChild(divArray)
        })
        div.appendChild(divValue)
    }

    if (checkIfOject(value) == true) {
        let divValue = document.createElement('div')
        divValue.classList.add('json-editor-field__content-json')

        Object.entries(value).forEach(([k, v]) => {
            let divJson = printOjectValue(k, v, '-child')
            divValue.appendChild(divJson)
        })

        div.appendChild(divValue)
    }

    return div
}

// Muestra los array
const printArrayValue = (value, child = '') => {
    let div = document.createElement('div')
    div.classList.add(`json-editor-field__content${child}`)

    if (['string', 'number'].includes(checkIfOject(value))) {
        let span = document.createElement('span')
        let text = document.createTextNode(`${value}`)

        if (checkIfOject(value) == 'string') {
            span.classList.add('json-editor-field__content-value-string')
        }

        if (checkIfOject(value) == 'number') {
            span.classList.add('json-editor-field__content-value')
        }
        span.appendChild(text)
        div.appendChild(span)
    }

    if (checkIfOject(value) == false) {
        let divValue = document.createElement('div')
        divValue.classList.add('json-editor-field__content-array')

        value.forEach((v) => {
            let divArray = printArrayValue(v, '-child')
            divValue.appendChild(divArray)
        })
        div.appendChild(divValue)
    }

    if (checkIfOject(value) == true) {
        let divValue = document.createElement('div')
        divValue.classList.add('json-editor-field__content-json')

        Object.entries(value).forEach(([k, v]) => {
            let divJson = printOjectValue(k, v, '-child')
            divValue.appendChild(divJson)
        })
        div.appendChild(divValue)
    }

    return div
}

// Muestra todos los valores
const printValues = (values) => {
    let div = document.getElementById("json-editor-field__json")

    if (checkIfOject(values) == true) {
        div.innerHTML = ""
        Object.entries(values).forEach(([key, value]) => {
            let divChild = printOjectValue(key, value)
            div.appendChild(divChild)
        })
    }

    if (checkIfOject(values) == false) {
        div.innerHTML = ""
        values.forEach((value) => {
            let divChind = printArrayValue(value)
            div.appendChild(divChind)
        })
    }
}

