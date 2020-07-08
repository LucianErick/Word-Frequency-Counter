const count_button = document.querySelector("button")
count_button.onclick = CountWords

function CountWords(event) {
    const text = document.getElementById("text").value
    const map = Count(text)
    const list = OrderFrequency(map)
    Show(list)
}

// Data Processing

function Count(text) {
    let dicionario = new Map()
    let list = OrderWords(SplitWords(text))
    list.forEach(word => {
        dicionario.set(word, CountFrequencyWord(word, list))
    });
    return dicionario
}

function SplitWords(text) {
    return text.replace(/[?.!,';"\(\)]/g, "")
    .trim()
    .replace(/[ ]{2,}/g, "")
    .replace("\n", " ")
    .toLowerCase()
    .split(/\s/g)
}

function OrderWords(WordList) {
    return WordList.sort()
}

function OrderFrequency(WordList) {
    let list = Array.from(WordList)
    list.sort((a, b) => {
        return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0
    })
    return list
}

function CountFrequencyWord(desireWord, WordList) {
    let occurrence = 0
    for (let word of WordList) {
        if (word == desireWord) {
            occurrence++
        }
    }
    return occurrence
}

// Inner HTML

function createElement(tag, classe) {
    const element = document.createElement(tag)
    element.classList.add(classe)
    return element
}

function Show(array) {
    const tableInfo = ["Ranking" ,"Quantidade", "word"]
    clearResults()

    const main = document.querySelector("main")
    const table = createElement("table")
    const thead = createElement("thead")
    const tr = createElement("tr")
    
    table.appendChild(thead)
    thead.appendChild(tr)
    
    tableInfo.forEach((valor) => {
        const th = createElement("th")
        tr.appendChild(th)
        th.innerHTML = valor
    })
    
    const tbody = createElement("tbody")
    table.appendChild(tbody)
    
    let index = 0
    for (const [key, value] of array) {
        const tr = createElement("tr")
        tbody.appendChild(tr)
        let td1 = createElement("td")
        let td2 = createElement("td")
        let td3 = createElement("td")
        td3.innerHTML = key
        td2.innerHTML = value
        td1.innerHTML = index + 1
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        index++
    }
    main.appendChild(table)
}

function clearResults() {
    const main = document.querySelector("main")
    const amountTables = document.querySelectorAll("table")

    if(amountTables.length > 0) {
        amountTables.forEach((table) => {
            main.removeChild(table)
        })   
    }
}

