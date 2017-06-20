/*
 * OverlayKeyBlocker - A working demo for deactivating and reactivating 
 * the overlay key.
 *
 * Copyright (C) 2017 lexruee. 
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
// Import Libraries
const Gio = imports.gi.Gio;


// Initialize variables
let mutterSettings;

function init() {
    mutterSettings = new Gio.Settings({ 'schema': 'org.gnome.mutter' });
}

function enable() {
    unbindOverlayKey();
}

function disable() {
    bindOverlayKey();
}

function unbindOverlayKey() {
    // simple hack to deactivate the overlay key by setting 
    // the keybinding of the overlay key to an empty string
    mutterSettings.set_string('overlay-key', '');
}

function bindOverlayKey() {
    // restore the default settings
    let defaultOverlayKey = mutterSettings.get_default_value('overlay-key');
    mutterSettings.set_value('overlay-key', defaultOverlayKey);
}
