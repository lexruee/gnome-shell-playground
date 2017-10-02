#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;
Gtk.init(null);

let window = new Gtk.Window({
    window_position: Gtk.WindowPosition.CENTER,
    title: "Hello World",
    default_height: 400,
    default_width: 400
});
window.connect("delete-event", Gtk.main_quit);
window.add(new Gtk.Label({
	label: "Panel"
}));
window.show_all();

Gtk.main();
