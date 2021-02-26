var DemoCMP = {},
    logger = new Logger({debugMode: true}),
    tileNavigation;

DemoCMP.LoadCMP = function () {
    tileNavigation = new Navigation();
    try {
        logger.debug('Widget version: ' + window.tizen.application.getAppInfo().version);
    } catch (e) {
        try {
            logger.debug('Widget version: ' + window.tizen.application.getAppInfo());
        } catch (e) {
            logger.debug('Tizen API is not reachable')
        }
    }
};

window.onload = DemoCMP.LoadCMP();
