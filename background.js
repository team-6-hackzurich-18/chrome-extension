// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({})
// })

chrome.webNavigation.onCompleted.addListener(function(details) {
    // console.log("We're on Fooby at " + details.url)

    chrome.browserAction.setIcon({path: "images/icon_3.png"})

}, {
    url: [
        {urlPrefix : 'https://fooby.ch/en/recipes/14229/lasagne-al-forno'}
    ]
})

// const knownUrls = [
//     'fooby.ch/en/recipes/14229/lasagne-al-forno'
// ]

// function isKnownUrl(urlString) {
//     const url = new URL(urlString)
//     var hostPath = url.host + url.pathname
//     for (var knwonUrl in knownUrls) {
//         if (knwonUrl === hostPath) {
//             return hostPath
//         }
//     }
//     return null
// }

// TODO: Reset icon state when you exit a page
// chrome.webNavigation.onBeforeNavigate.addListener(function() {
//     console.log("reset")
//     chrome.browserAction.setIcon({path: "images/icon.png"})
// })