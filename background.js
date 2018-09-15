// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({})
// })

chrome.webNavigation.onCompleted.addListener(function(details) {
    // console.log("We're on Fooby at " + details.url)

    chrome.browserAction.setIcon({path: "images/icon_3.png"})

    chrome.tabs.executeScript(
        details.tabId,
        { 
            code: `
                var metaContainer = document.getElementsByClassName('page-header-recipe__meta-container')[0]

                var informationNode =   \`<div class="meta-info meta-info--big" style="color: orange;">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" style="fill: orange">
                                                <path d="M256 0c-141.385 0-256 114.615-256 256s114.615 256 256 256 256-114.615 256-256-114.615-256-256-256zM256 480.001c-31.479 0-61.436-6.506-88.615-18.226l116.574-131.145c2.603-2.929 4.041-6.711 4.041-10.63v-48c0-8.837-7.163-16-16-16-56.495 0-116.102-58.731-116.687-59.313-3-3.001-7.070-4.687-11.313-4.687h-64c-8.836 0-16 7.164-16 16v96c0 6.061 3.424 11.601 8.845 14.311l55.155 27.578v93.943c-58.026-40.478-96-107.716-96-183.832 0-34.357 7.745-66.903 21.569-96h58.431c4.244 0 8.313-1.686 11.314-4.686l64-64c3-3.001 4.686-7.070 4.686-11.314v-38.706c20.281-6.037 41.759-9.294 64-9.294 35.203 0 68.502 8.13 98.141 22.6-2.072 1.751-4.088 3.582-6.023 5.518-18.133 18.132-28.118 42.239-28.118 67.882s9.985 49.75 28.118 67.882c18.217 18.216 42.609 28.132 67.817 28.13 1.583 0 3.171-0.040 4.759-0.118 6.907 25.901 19.376 93.328-4.202 186.167-0.222 0.872-0.348 1.744-0.421 2.612-40.662 41.54-97.35 67.328-160.071 67.328z"></path>
                                            </svg>
                                            Emissions: 304.3 kg CO2
                                        </div>\`
                
                metaContainer.innerHTML = informationNode + metaContainer.innerHTML
            `
        }
    )
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