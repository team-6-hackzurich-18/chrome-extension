// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({})
// })

function getColor(worldEquivalent) {
    var color = '#000000'
    // 0.75 sehr grün
    // 1 grün
    // 1.25 gelb
    // 1.5 rot
    // > sehr rot
    if (worldEquivalent < 0.75) {
        color = '#417505'
    } else if (worldEquivalent < 1) {
        color = '#7ED321'
    } else if (worldEquivalent < 1.25) {
        color = '#F8E71C'
    } else if (worldEquivalent < 1.5) {
        color = '#F5A623'
    } else {
        color = '#D0021B'
    }

    return color
}

const colorToImageId = {
    '#417505': 0,
    '#7ED321': 1,
    '#F5A623': 2,
    '#F8E71C': 3,
    '#D0021B': 4
}

function updateIcon(color, reset) {
    var imagePath = "images/icon.png"

    if (!reset) {
        imagePath = "images/icon_" + colorToImageId[color] + ".png"
    }

    chrome.browserAction.setIcon({path: imagePath})    
}

function enhanceWebsite(info, ingredients) {
    var worldEquivalent = ingredients["worldsConsumed"]
    var co2 = ingredients["cost_recipe"]

    var color = getColor(worldEquivalent)
    updateIcon(color, false)

    chrome.tabs.executeScript(
        info.tabId,
        { 
            code: `
                var metaContainer = document.getElementsByClassName('page-header-recipe__meta-container')[0]

                var informationNode =   \`<div class="meta-info meta-info--big" style="color: `+ color +`;">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" style="fill: `+ color +`">
                                                <path d="M256 0c-141.385 0-256 114.615-256 256s114.615 256 256 256 256-114.615 256-256-114.615-256-256-256zM256 480.001c-31.479 0-61.436-6.506-88.615-18.226l116.574-131.145c2.603-2.929 4.041-6.711 4.041-10.63v-48c0-8.837-7.163-16-16-16-56.495 0-116.102-58.731-116.687-59.313-3-3.001-7.070-4.687-11.313-4.687h-64c-8.836 0-16 7.164-16 16v96c0 6.061 3.424 11.601 8.845 14.311l55.155 27.578v93.943c-58.026-40.478-96-107.716-96-183.832 0-34.357 7.745-66.903 21.569-96h58.431c4.244 0 8.313-1.686 11.314-4.686l64-64c3-3.001 4.686-7.070 4.686-11.314v-38.706c20.281-6.037 41.759-9.294 64-9.294 35.203 0 68.502 8.13 98.141 22.6-2.072 1.751-4.088 3.582-6.023 5.518-18.133 18.132-28.118 42.239-28.118 67.882s9.985 49.75 28.118 67.882c18.217 18.216 42.609 28.132 67.817 28.13 1.583 0 3.171-0.040 4.759-0.118 6.907 25.901 19.376 93.328-4.202 186.167-0.222 0.872-0.348 1.744-0.421 2.612-40.662 41.54-97.35 67.328-160.071 67.328z"></path>
                                            </svg>
                                            Emissions: ` + co2.toFixed(2) + ` kg CO<sub>2</sub>
                                        </div>\`
                
                metaContainer.innerHTML = informationNode + metaContainer.innerHTML

                var addButtonListEntry = \`<a class="share-group__single-link tooltip-trigger tooltip-trigger-bound" href="#" id="add_to_mealplan">
                                <div class="share-group__single-share-icon">
                                    
                                    <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <defs>
                                            <clipPath id="bookmark-cut">
                                                <path d="M3.9922,18V2h3.0107v5.9873L9.5,6.2407l2.4961,1.7466V2h2.0879L14,8.0278c0,0-4-0.1943-5.4165,3.4722 c-1.4624,3.7852,1.7632,6.5,1.7632,6.5H3.9922z"></path>
                                            </clipPath>
                                        </defs>
                                        <path class="animated" fill="#9B9B9B" d="M15.49023,13.00391l-1.49023,0V11.48235a.49389.49389,0,0,0-.49219-.50091.49971.49971,0,0,0-.5.5v1.52246H11.50316a.49971.49971,0,0,0-.5.5.48223.48223,0,0,0,.49488.48433h1.5098l0,1.53813a.496.496,0,1,0,.99173-.00827V13.99564l1.49849.00044a.48648.48648,0,0,0,.4922-.49217A.49971.49971,0,0,0,15.49023,13.00391Z"></path>
                                        <path class="animated" fill="#9B9B9B" d="M15,8.21454V2.51221A1.51224,1.51224,0,0,0,13.48779,1H11.99658l-4.99365.00391H1V19H13.42761a.56376.56376,0,0,1,.07733,0A5.49656,5.49656,0,0,0,15,8.21454ZM7.95294,2h3.09363V6.16339l-1.0022-.70117-.54462-.381-.54462.381-1.0022.70117ZM2,2H3l.02344,16.00391L2,18ZM3.99219,18V2H7.00293V7.98749L9.49976,6.2406l2.49683,1.74689V2h1.49121A.51282.51282,0,0,1,14,2.51221V8.028c-.16333-.01465-.32794-.025-.49506-.025A5.49858,5.49858,0,0,0,10.34644,18Zm9.51276.00391A4.50046,4.50046,0,1,1,18,13.50348,4.50283,4.50283,0,0,1,13.50494,18.00391Z"></path>
                                        <g clip-path="url(#bookmark-cut)">
                                            <g class="fill-up">
                                                <path class="animated" transform="translate(0, 20)" fill="#9B9B9B" d="M0,20.00392H20v-18.4a5.92753,5.92753,0,0,1-2.79687,1.11875c-4.98437.75-8.5625-2.67188-11.96875-2.625A6.014,6.014,0,0,0-.00392,2.89412Z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span class="share-group__single-share-copy">ADD TO MEALPLAN</span>
                            </a>\`

                metaContainer.innerHTML += addButtonListEntry

                document.getElementById("add_to_mealplan").addEventListener("click",
                function() {
                    chrome.runtime.sendMessage('` + info.key + `')
                }, false);
            `
        }
    )
}

chrome.webNavigation.onCompleted.addListener(function(details) {
    // console.log("We're on Fooby at " + details.url)

    var info = {
        url: details.url,
        tabId: details.tabId
    }

    if (axiosInstance == null) {
        initalizeAxiosInstance(info, getScoreForRecipe)
    } else {
        getScoreForRecipe(info)
    }
}, {
    url: [
        {urlPrefix: 'https://fooby.ch/en/recipes/'}
    ]
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("Got message: " + message)
    var key = message
    if (key in recipes) {
        addRecipeToMealplan(recipes[key])
    } else {
        console.log("Error: Recipe not found for storing.")
    }    
})

function addRecipeToMealplan(recipe) {
    const restPath = '/recipes'
    console.log(recipe)
    axiosInstance.post(restPath, recipe)
    .then(function(response) {
        console.log("Successfuly added!")
        console.log(response)
    })
    .catch(function(error) {
        console.log(error)
    })
}

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

// API

var axiosInstance = null
function initalizeAxiosInstance(params, callback) {
    chrome.storage.sync.get('apiBaseUrl', function(data) {
        axiosInstance = axios.create({
            baseURL: data.apiBaseUrl
        })
        callback(params)
    })
}

// We expect axiosInstance to be initalized
function getScoreForRecipe(info) {
    var link = new URL(info.url)
    var key = link.host + link.pathname
    info.key = key
    if (key in recipes) {
        getScoreForIngredients(info, recipes[key]["ingredients"])
    } else {
        // Maybe randomize
        updateIcon(0, true)
    }    
}

function getScoreForIngredients(info, ingredients) {
    const restPath = '/stats/ingredients'
    axiosInstance.post(restPath, {
        ingredients: ingredients
    })
    .then(function(response) {
        enhanceWebsite(info, response.data)
    })
    .catch(function(error) {
        console.log(error)
    })
}
