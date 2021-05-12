import './popup.sass'
let m = require('mithril')

let state = {
    response: null
}

let Button = {
    view: function () {
        return <button onclick={ e => sendHello() }>Send message to content script!</button>
    }
}

let App = {
    view: () => {

        return <div>
            <Button/>
            <p class={ state.response ? "" : "hidden" }>Content script responded: {state.response}</p>
        </div>
    }
}

async function sendHello() {
    let tabId = await chrome.tabs.query({active: true, lastFocusedWindow: true })
    tabId = tabId[0].id
    chrome.tabs.sendMessage(tabId, { greeting: "hello" }, response => {
        state.response = response
        m.redraw()
        console.log("tab responded: ", response)
    })
}

m.mount(document.body, App)