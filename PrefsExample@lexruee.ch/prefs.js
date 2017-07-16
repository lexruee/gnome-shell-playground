const Lang = imports.lang; // for using closure Lang.bind()
const Gtk = imports.gi.Gtk; // GTK+ stuff
const GObject = imports.gi.GObject; // GObject introspection

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const Gettext = imports.gettext.domain(Me.metadata['gettext-domain']);
const _ = Gettext.gettext;


/*
 * Preferences Widget. It is basically class that inherits from Gtk.Vbox.
 */
const MyPreferencesWidget= new GObject.Class({
    Name: 'MyPreferencesWidget',
    GTypeName: 'MyPreferencesWidget',
    Extends: Gtk.VBox, // <-- here we use inheritance

    _init: function() {
        // setup our vertical box
        this.parent({
            spacing: 5,
            border_width: 10,
            margin: 20
        });

        // see settings-schema in metadata.json
        this.settings = Convenience.getSettings(Me.metadata['settings-schema']);

        // first hbox for the switch disable suspend button
        let switchSuspendButtonHbox = new Gtk.HBox();
        let switchSuspendLabel = new Gtk.Label({
            label: _("Disable suspend button"),
            xalign: 0,
            hexpand: true
        });
        let switchSuspendButton = new Gtk.Switch({
            halign: Gtk.Align.END,
            active: this.settings.get_boolean('disable-suspend-button')
        });
        switchSuspendButton.connect('notify::active', Lang.bind(this, function(check) {
            let boolean_value = check.get_active();
            this.settings.set_boolean('disable-suspend-button', boolean_value);
        }));

        switchSuspendButtonHbox.add(switchSuspendLabel);
        switchSuspendButtonHbox.add(switchSuspendButton);

        // second hbox for switch button 1
        let switchHbox1 = new Gtk.HBox();
        let switchLabel1 = new Gtk.Label({
            label: _("Switch Label 1"),
            xalign: 0,
            hexpand: true
        });
        let switchButton1 = new Gtk.Switch({ halign: Gtk.Align.END });
        switchHbox1.add(switchLabel1);
        switchHbox1.add(switchButton1);

        // third hbox for switch button 2
        let switchHbox2 = new Gtk.HBox();
        let switchLabel2 = new Gtk.Label({
            label: _("Switch Label 2"),
            xalign: 0,
            hexpand: true
        });
        let switchButton2 = new Gtk.Switch({ halign: Gtk.Align.END });
        switchHbox2.add(switchLabel2);
        switchHbox2.add(switchButton2);

        // add hbox to the vbox
        this.add(switchSuspendButtonHbox);
        this.add(switchHbox1);
        this.add(switchHbox2);
    }
});


// Initialize menu language translations
function init() {
    // see gettext-domain in metadata.json
    Convenience.initTranslations(Me.metadata['gettext-domain']);
}

function buildPrefsWidget() {
    let widget = new MyPreferencesWidget();
    widget.show_all();
    return widget;
}
