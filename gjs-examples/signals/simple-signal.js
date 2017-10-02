#!/usr/bin/env gjs

const Lang = imports.lang;
const Signals = imports.signals;

const Model = new Lang.Class({
    Name: 'Model',

    _init: function () {
        log('test');
    },

    changed: function () {
        log('signal emit');
        this.emit("model-changed");
    }
});
Signals.addSignalMethods(Model.prototype);

let model = new Model();
model.connect('model-changed', Lang.bind(this, function () {
    log('receive event signal');
}));

model.changed();
