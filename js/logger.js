function Logger(options) {
    options = options ? options : {};
    this.debugMode = options.debugMode || false;
    this.loggerStyles = {
        top: options.top || 0,
        left: options.left || 0,
        font_size: options.fontSize || '16px'
    };
    this.parentContainer = options.parentContainer || document.body;
    this.headContainer = document.head || document.getElementsByTagName('head')[0];
    this.loggerContainer = document.createElement('div');
    this.hide_time = options.hideTime || false;

    this.init();
}

Logger.prototype = {

    init: function () {
        let that = this;

        that.createContainer();
        that.catchAlertMessages();
        that.catchWindowErrors();

        that.info('Log Started at', that.getDate(), that.getTime());
    },
    pretty_print: function (obj) {
        let output = '';
        if (typeof(obj) === 'string') return obj;
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                switch (typeof(obj[prop])) {
                    case 'object':
                        output += "=" + this.pretty_print(obj[prop]);
                        break;
                    case 'function':
                        break;
                    default:
                        output += JSON.stringify(obj[prop]);
                }
            }
        }
        return output;
    },

    log: function(level, ...msgs) {
        let time = !this.hide_time ? this.getTime() : '',
            message = document.createElement('p'),
            messageTextNode = document.createTextNode(time + ' ' + level + ' ' + msgs.join(' '));
        message.className = 'logger-message m-' + level.toLowerCase();
        message.appendChild(messageTextNode);
        this.loggerContainer.appendChild(message);
        this.scrollToBottom();
        console.log(time + ' ' + level + ' ' + msgs.join(' '));
    },

    debug: function(...msgs) {
        if (this.debugMode) this.log('DEBUG', ...msgs);
    },

    error: function(...msgs) {
        this.log('ERROR', ...msgs);
    },

    info: function(...msgs) {
        this.log('INFO', ...msgs);
    },

    success: function(msg) {
        this.log('SUCCESS', msg);
    },

    catchAlertMessages: function () {
        let that = this;
        let _old_alert = window.alert;
        window.alert = function() {
            // run some code when the alert pops up
            that.alert(arguments[0]);
            _old_alert.apply(window,arguments);
            // run some code after the alert
        };
    },

    catchWindowErrors: function () {
        let that = this;
        window.onerror = function(error, url, line) {
            let msg = error + ' URL:' + url + ' L:' + line;
            that.log('ERROR', msg);
        };
    },

    toolbarToggle: function () {
        this.loggerContainer.classList.toggle('hidden');
        this.scrollToBottom();
    },

    getTime: function() {
        let now = new Date(),
            hour = ("0" + now.getHours()).slice(-2),
            minute = ("0" + now.getMinutes()).slice(-2),
            second = ("0" + now.getSeconds()).slice(-2);
        return hour + ":" + minute + ":" + second;
    },

    getDate: function() {
        let now = new Date(),
            year = '' + now.getFullYear(),
            month = ('0' + (now.getMonth()+1)).slice(-2),
            date = ('0' + now.getDate()).slice(-2);
        return year + '-' + month + '-' + date;
    },

    scrollToBottom: function() {
        this.loggerContainer.scrollTop = this.loggerContainer.scrollHeight;
    },

    createContainer: function() {
        this.loggerContainer.className = 'logger-container hidden';
        this.parentContainer.appendChild(this.loggerContainer);
        let styles = document.createElement('style');
        let stylesText =
            '.logger-container {' +
                'position: absolute;' +
                'top: ' + this.loggerStyles.top + ';' +
                'bottom: 0;' +
                'left: ' + this.loggerStyles.left + ';' +
                'right: 0;' +
                'font-family: Helvetica,Arial,sans-serif;' +
                'padding: 10px;' +
                'background: rgba(0,0,0,0.9);' +
                'opacity: .9;' +
                'overflow: auto;' +
                'z-index: 9999999;' +
            '}' +
            '.logger-container .logger-message {' +
                'font-size: ' + this.loggerStyles.font_size + ';' +
                'color: #fff;' +
                'border-bottom: 2px dotted rgba(255,255,255,0.3);' +
                'padding-bottom: 3px;' +
                'margin: 3px 0;' +
            '}' +
            '.logger-container .logger-message.m-success {' +
                'color: #5be958;' +
            '}' +
            '.logger-container .logger-message.m-error {' +
                'color: #fc4c4c;' +
            '}' +
            '.logger-container .logger-message.m-warning {' +
                'color: #fcce4c;' +
            '}' +
            '.logger-container .logger-message.m-info {' +
                'color: #40dcff;' +
            '}' +
            '.logger-container .logger-message.m-alert {' +
                'color: #bbbbbb;' +
            '}' +
            '.hidden {' +
                'display: none;' +
            '}';
        styles.type = 'text/css';
        this.headContainer.appendChild(styles);
        styles.appendChild(document.createTextNode(stylesText));
    }
};
