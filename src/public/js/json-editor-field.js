const setTabActive = (tab) => {
    let tabActive = document.querySelectorAll(".json-editor-field__tab-active")[0]

    if (tabActive !== tab) {
        tabActive.classList.remove("json-editor-field__tab-active")
        tab.classList.add("json-editor-field__tab-active")

        let target = tab.getAttribute("data-tab")
        let targetActive = tabActive.getAttribute("data-tab")

        document.getElementById(targetActive).classList.add("json-editor-field__hidden")
        document.getElementById(target).classList.remove("json-editor-field__hidden")
    }
};

const setTabsFunctions = () => {
    let tabs = document.querySelectorAll(".json-editor-field__tab")

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            setTabActive(tab)
        })
    })
}

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

const printArrayValue = (value, child = '') => {
    let div = document.createElement('div')
    div.classList.add(`json-editor-field__content${child}`)

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

    return div
}

const printValues = (values) => {
    let div = document.getElementById("json-editor-field__json")

    if (checkIfOject(values) == true) {
        Object.entries(values).forEach(([key, value]) => {
            let divChild = printOjectValue(key, value)
            div.appendChild(divChild)
        })
    }

    if (checkIfOject(values) == false) {
        values.forEach((value) => {
            let divChind = printArrayValue(value)
            div.appendChild(divChind)
        })
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setTabsFunctions()
    let values = document.getElementById("json-editor-field__textarea").querySelector("textarea").value
    values = JSON.parse(values)

    printValues(values)
})
