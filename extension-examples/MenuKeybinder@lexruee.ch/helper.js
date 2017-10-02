/*
 * MenuKeybinder - A working demo for binding the panel-main-menu to
 * the super key.
 *
 * Copyright (C) 2017 lexruee 
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
const Lang = imports.lang;
const Gio = imports.gi.Gio;

// Constants
const SUPER_L = 'Super_L';
const OVERLAY_KEY = 'overlay-key';
const PANEL_MAIN_MENU = 'panel-main-menu';
const EMPTY_STRING = '';
const MUTTER_SCHEMA = { 'schema': 'org.gnome.mutter' };
const WM_KEYBINDINGS_SCHEMA = { 'schema': 'org.gnome.desktop.wm.keybindings' };
 

const OverlayKeyBlocker = new Lang.Class({
    Name: 'OverlayKeyBlocker',
    
    _init: function() {
        this._mutterSettings = new Gio.Settings(MUTTER_SCHEMA);
    },
    
    enable: function() {
        // simple hack to deactivate the overlay key by setting 
        // the keybinding of the overlay key to an empty string
        this._mutterSettings.set_string(OVERLAY_KEY, EMPTY_STRING);
    },
    
    disable: function() {
        // restore the default settings
        let defaultOverlayKey = this._mutterSettings.get_default_value(OVERLAY_KEY);
        this._mutterSettings.set_value(OVERLAY_KEY, defaultOverlayKey);
    }
});

const MenuKeybinder = new Lang.Class({
    Name: 'MenuKeybinder',
    
    _init: function(keybinding) {
        this._keybinding = keybinding;
        this._wmKeybindings = new Gio.Settings(WM_KEYBINDINGS_SCHEMA);
        this._overlayKeyBlocker = new OverlayKeyBlocker();
    },
    
    enable: function() {
        if(this._keybinding == SUPER_L)
            this._overlayKeyBlocker.enable();
        this._wmKeybindings.set_strv(PANEL_MAIN_MENU, [this._keybinding]);
    },
    
    disable: function() {
        // restore the default settings
        if(this._keybinding == SUPER_L)
            this._overlayKeyBlocker.disable();
        let defaultPanelMainMenu = this._wmKeybindings.get_default_value(PANEL_MAIN_MENU);
        this._wmKeybindings.set_value(PANEL_MAIN_MENU, defaultPanelMainMenu);
    }
});
