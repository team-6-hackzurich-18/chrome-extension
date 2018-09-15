function save_options() {
    var baseUrlValue = document.getElementById('baseUrl').value
    console.log("Save new API base url: " + baseUrlValue)
    chrome.storage.sync.set({
        apiBaseUrl: baseUrlValue
    }, function() {
        console.log("Saved new API base url: " + baseUrlValue)
        var status = document.getElementById('status')
        status.textContent = 'Option saved.'
        setTimeout(function() {
            status.textContent = ''
        }, 750)
    })
}

function restore_options() {
    chrome.storage.sync.get({
        apiBaseUrl: ''
    }, function(items) {
        document.getElementById('baseUrl').value = items.apiBaseUrl
    })
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)