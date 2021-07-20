var DemoCMP = {},
    tileNavigation;

DemoCMP.LoadCMP = function () {
    tileNavigation = new Navigation();
    try {
        console.log('Widget version: '+ window.tizen.application.getAppInfo().version);
    } catch (e) {
        console.log(e);
    }
};

window.onload = DemoCMP.LoadCMP();
