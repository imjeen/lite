const app = getApp();

class Stat {
    constructor() {
        this.ald = app.aldstat;
        this.version = '0.0.1';
    }

    track(name, options) {
        console.log('track =>', name, ':', options);
        if (process.env.NODE_ENV === 'production') {
            this.ald.sendEvent.call(null, name, options);
        }
    }
}

export default new Stat();
