const checkIsObject = (value) => {
    if (Array.isArray(value)) {
        return false
    } else {
        return true
    }
}

const getTextareaValue = () => {
    let textarea = document.getElementById("json-editor-field__textarea").querySelector("textarea")
    let values = JSON.parse(textarea.value)
    return [textarea, values]
}

const changeValue = (values) => {
    let string = JSON.stringify(values, null, 2)
    let textarea = getTextareaValue()[0]
    textarea.value = string
    printValues(values)
}

const changArrayOrder = (current, order) => {
    let newArray = new Array(current.length)
    order.forEach((value, index) => {
        newArray[index] = current[value]
    })

    return newArray
}

const setDragAndDrop = (div, values = null) => {
    let groupName = null
    Sortable.create(div, {
        animation: 150,
        chosenClass: 'json-editor-field__content-array-selected',
        // ghostClass: 'json-editor-field__content-array-ghost',
        dragClass: 'json-editor-field__content-array-drag',
        onEnd: (e) => {
            groupName = e.target.getAttribute('data-id')
        },
        // group: '',
        store: {
            set: (Sortable) => {

                if (values == null) {
                    values = getTextareaValue()[1]
                }

                let current = values
                const order = Sortable.toArray()

                if (groupName != null) {
                    let keys = groupName.split('.')
                    let keysLength = keys.length - 1
                    keys.forEach((key, index) => {
                        if (index === keysLength) {
                            current[key] = changArrayOrder(current[key], order)
                        } else {
                            current = current[key]
                        }
                    })
                    changeValue(values)
                } else {
                    current = changArrayOrder(current, order)
                    changeValue(current)
                }
            }
        }
    })

}

const printOjectValue = (key, value, oldKeys = '', child = '') => {
    let div = document.createElement('div')
    div.classList.add(`json-editor-field__content${child}`)

    let spanKey = document.createElement('span')
    spanKey.classList.add('json-editor-field__content-key')

    let textKey = document.createTextNode(`${key} :`)

    spanKey.appendChild(textKey)
    div.appendChild(spanKey)

    if (['string', 'number'].includes(typeof value)) {
        let spanValue = document.createElement('span')
        let textValue = document.createTextNode(`${value}`)
        spanValue.appendChild(textValue)

        if (typeof value == 'string') {
            spanValue.classList.add('json-editor-field__content-value-string')
        }

        if (typeof value == 'number') {
            spanValue.classList.add('json-editor-field__content-value')
        }

        div.appendChild(spanValue)
    } else {
        let AddKey = `${key}`
        if (child != '') {
            AddKey = `.${key}`
        }

        oldKeys += AddKey
        let divValue = printContentChild(value, oldKeys)
        div.appendChild(divValue)
        oldKeys -= AddKey
    }

    return div
}

const printArrayValue = (key, value, oldKeys = '', child = '') => {
    let div = document.createElement('div')
    div.classList.add(`json-editor-field__content${child}`)
    div.setAttribute('data-id', `${key}`)

    if (['string', 'number'].includes(typeof value)) {
        let spanValue = document.createElement('span')
        let textValue = document.createTextNode(`${value}`)
        spanValue.appendChild(textValue)

        if (typeof value == 'string') {
            spanValue.classList.add('json-editor-field__content-value-string')
        }

        if (typeof value == 'number') {
            spanValue.classList.add('json-editor-field__content-value')
        }

        div.appendChild(spanValue)
    } else {
        let AddKey = `${key}`
        if (child != '') {
            AddKey = `.${key}`
        }

        oldKeys += AddKey
        let divValue = printContentChild(value, oldKeys)
        div.appendChild(divValue)
        oldKeys -= AddKey
    }

    return div
}

const printContentChild = (values, oldKeys) => {
    let divValue = document.createElement('div')

    if (checkIsObject(values)) {
        divValue.classList.add('json-editor-field__content-json')
        divValue.setAttribute('data-id', `${oldKeys}`)

        Object.entries(values).forEach(([key, value]) => {
            let divChild = printOjectValue(key, value, oldKeys, '-child')
            divValue.appendChild(divChild)
        })

    } else {
        divValue.classList.add('json-editor-field__content-array')
        divValue.setAttribute('data-id', `${oldKeys}`)

        values.forEach((value, key) => {
            let divChild = printArrayValue(key, value, oldKeys, '-child')
            divValue.appendChild(divChild)
        })
    }

    return divValue
}

const printValues = () => {
    let values = getTextareaValue()[1]
    let div = document.getElementById("json-editor-field__json")
    div.innerHTML = ""

    let oldKeys = ""

    if (checkIsObject(values)) {
        Object.entries(values).forEach(([key, value]) => {
            let devChild = printOjectValue(key, value, oldKeys)
            div.appendChild(devChild)
        })
    } else {
        let divArray = document.createElement('div')
        values.forEach((value, key) => {
            let devChild = printArrayValue(key, value, oldKeys)
            divArray.appendChild(devChild)
            div.appendChild(divArray)
        })
        setDragAndDrop(divArray)
    }

    let allArrays = div.querySelectorAll('.json-editor-field__content-array')
    if (allArrays.length > 0) {
        allArrays.forEach((array) => {
            setDragAndDrop(array, values)
        })
    }
}
