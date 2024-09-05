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

const changeValue = (values) => {
    let string = JSON.stringify(values, null, 2)
    let textarea = document.getElementById("json-editor-field__textarea").querySelector("textarea")
    textarea.value = string
    printValues(values)
}

// Muestra los json
const printOjectValue = (key, value, oldKeys = '', child = '') => {
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

    let AddKey = `${key}`
    if (child != '') {
        AddKey = `.${key}`
    }

    if (checkIfOject(value) == false) {
        oldKeys += AddKey
        let divValue = document.createElement('div')
        divValue.classList.add('json-editor-field__content-array')
        divValue.setAttribute('data-id', `${oldKeys}`)

        value.forEach((v, k) => {
            let divArray = printArrayValue(k, v, oldKeys, '-child')
            divValue.appendChild(divArray)
        })
        div.appendChild(divValue)
        oldKeys -= AddKey
    }

    if (checkIfOject(value) == true) {
        oldKeys += AddKey
        let divValue = document.createElement('div')
        divValue.classList.add('json-editor-field__content-json')
        divValue.setAttribute('data-id', `${oldKeys}`)
        
        Object.entries(value).forEach(([k, v]) => {
            let divJson = printOjectValue(k, v, oldKeys,  '-child')
            divValue.appendChild(divJson)
        })

        div.appendChild(divValue)
        oldKeys -= AddKey
    }

    return div
}

// Muestra los array
const printArrayValue = (key, value, oldKeys = '', child = '') => {
    let div = document.createElement('div')
    div.classList.add(`json-editor-field__content${child}`)
    div.setAttribute('data-id', `${key}`)

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

    let AddKey = `${key}`
    if (child != '') {
        AddKey = `.${key}`
    }

    if (checkIfOject(value) == false) {
        oldKeys += AddKey
        let divValue = document.createElement('div')
        divValue.classList.add('json-editor-field__content-array')
        divValue.setAttribute('data-id', `${oldKeys}`)

        value.forEach((v, k) => {
            let divArray = printArrayValue(k, v, oldKeys, '-child')
            divValue.appendChild(divArray)
        })
        div.appendChild(divValue)
        oldKeys -= AddKey
    }

    if (checkIfOject(value) == true) {
        oldKeys += AddKey
        let divValue = document.createElement('div')
        divValue.classList.add('json-editor-field__content-json')
        divValue.setAttribute('data-id', `${oldKeys}`)

        Object.entries(value).forEach(([k, v]) => {
            let divJson = printOjectValue(k, v, '', '-child')
            divValue.appendChild(divJson)
        })
        div.appendChild(divValue)
        oldKeys -= AddKey
    }

    return div
}

const changArrayOrder = (current, order) => {
    let newArray = new Array(current.length)

    order.forEach((value, index) => {
        // console.log('original positin:'+value+' change to:'+index+ ' value:'+ current[value])
        newArray[index] = current[value]
    })
    return newArray
}

// Muestra todos los valores
const printValues = (values) => {

    let div = document.getElementById("json-editor-field__json")

    let oldKeys = ""

    if (checkIfOject(values) == true) {
        div.innerHTML = ""
        Object.entries(values).forEach(([key, value]) => {
            let divChild = printOjectValue(key, value, oldKeys)
            div.appendChild(divChild)
        })
    }

    if (checkIfOject(values) == false) {
        div.innerHTML = ""
        values.forEach((value, key) => {
            let divChind = printArrayValue(key, value, oldKeys)
            div.appendChild(divChind)
        })
    }

    let allArrays = div.querySelectorAll('.json-editor-field__content-array')

    allArrays.forEach((array) => {
        let groupName = ''
        Sortable.create(array, {
            animation: 150,
            chosenClass: "json-editor-field__content-array-selected",
            // ghostClass: "json-editor-field__content-array-ghost",
            dragClass: "json-editor-field__content-array-drag",

            onEnd: (e) => {
                groupName = e.target.getAttribute("data-id")
            },
            // group: 'hola',
            store: {
                set: (Sortable) => {
                    let current = values
                    const order = Sortable.toArray()
                    let keys = groupName.split('.')

                    keys.forEach((key, index) => {
                        if (index === keys.length - 1) {
                            current[key] = changArrayOrder(current[key], order)
                        } else {
                            current = current[key]
                        }
                    })
                    changeValue(values)
                }
            }

        })
    })
}
