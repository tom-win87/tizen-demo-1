# Tizen Demo App
Tizen Demo Web App that demonstrates ability to display integrated CMP

## Requirements
1. Tizen Studio

## Import project
If you already have Tizen Studio installed:
1. Clone the repo to your workspace directory
2. In Tizen Studio click File > Import menu item
3. Choose the directory where you have just cloned the repo
4. Select project to import from the list

## Running on the Samsung TV Simulator
To run the application on the simulator:
1. In the Project Explorer view, right-click the project and select Run As > Tizen Web Simulator Application (Samsung TV).

# Useful links
https://docs.tizen.org/application/web/get-started/overview/
https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-simulator.html

## Navigation class(navigation.js)
Available methods:
- `onLoad` runs on startup, trigger registerAllKey and bindEvents functions
- `getViewportContent` gets document object of an iframe
- `handleEvent` handle navigation event and depends on direction call appropriate function moveHorizontally or moveVertically
- `moveHorizontally` compute the next selector and focuse it
- `moveVertically` compute the next group of elements and focuse on its first element
- `registerAllKey` register all available key of a remote control
- `registerKey` register a button of a remote control by key name
- `unregisterKey` unregister a button of remote control by key name
- `onKeyDownPress` handle pressed keys of a remote control
- `bindEvents` add event listener from a remote control