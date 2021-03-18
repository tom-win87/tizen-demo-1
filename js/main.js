var DemoCMP = {},
    logger = new Logger({debugMode: true}),
    tileNavigation;

DemoCMP.LoadCMP = function () {
    tileNavigation = new Navigation();
    try {
        logger.debug('Widget version: '+ window.tizen.application.getAppInfo().version);
    } catch (e) {
        logger.debug(e);
    }
};

window.onload = DemoCMP.LoadCMP();
