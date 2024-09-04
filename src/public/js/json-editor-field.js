// hace funcionar los tabs
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
}

// Agrega la funcion a los tabs para que cambien
const setTabsFunctions = () => {
    let tabs = document.querySelectorAll(".json-editor-field__tab")

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            setTabActive(tab)
        })
    })
}

const printTextarea = (textarea, values) => {
    let textValues = [false, values]
    textarea.addEventListener("keyup", (e) => {
        try {
            
            let jsonValues = JSON.parse(e.target.value)

            if (jsonValues != values) {
                printValues(jsonValues)
                textValues[0] = true
                textValues[1] = jsonValues
            }

        } catch (error) {
            textValues[0] = false
        }
    })

    const tabButton = document.querySelector('[data-tab="json-editor-field__json"]')
    tabButton.addEventListener("click", () => {
        if (textValues[0] == false) {
            textarea.value = JSON.stringify(textValues[1], null, 2)
        }
    })
}

const changeValue = (values) => {
    let textarea = document.getElementById("json-editor-field__textarea").querySelector("textarea")
    textarea.valuetextarea.value = JSON.stringify(values, null, 2)
    printValues(values)
}

document.addEventListener("DOMContentLoaded", function () {
    setTabsFunctions()
    let textarea = document.getElementById("json-editor-field__textarea").querySelector("textarea")
    let values = textarea.value
    values = JSON.parse(values)

    printValues(values)
    printTextarea(textarea, values)
})
