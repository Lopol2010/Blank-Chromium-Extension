import "./content.sass"
let m = require('mithril')

let state = {
    visible: false
}

let Modal = {
    view: function () {
        return state.visible ? 
        <div class="modal" onclick = { e => state.visible = false }>
            <p>Hello from content script!</p>
        </div>
        : null
    }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    console.log("hello from ", sender.tab ?
                "a content script:" + sender.tab.url :
                "the extension")

    state.visible = true
    m.redraw()

    if (request.greeting == "hello")
    {
        sendResponse({farewell: "goodbye"})
        console.log('state.visible ' + state.visible)
    }
  }
)

let root = document.createElement('div')
document.body.append(root)
// alert(root)
m.mount(root, Modal)