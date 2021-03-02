var DemoCMP = {},
    logger = new Logger({debugMode: true}),
    tileNavigation;

DemoCMP.LoadCMP = function () {
    tileNavigation = new Navigation();
};

window.onload = DemoCMP.LoadCMP();
