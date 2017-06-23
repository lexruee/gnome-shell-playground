/*
 * HotcornerDisabler - A working demo for disabling and enabling
 * the gnome-shell hotconer.
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
const Lang = imports.lang;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;


const HotcornerManager = new Lang.Class({
    Name: 'HotcornerManager',
    
    _init: function() {
        this._id = null;
    },
    
    disableHotcorners: function() {
        let hotCorners = Main.layoutManager.hotCorners;
        hotCorners.forEach(function(corner) {
            if(corner) {
                corner._toggleOverview = function() {};
                corner._pressureBarrier._trigger = function() {};
            }
        });
        if(!this._id) {
            this._id = Main.layoutManager.connect('hot-corners-changed', Lang.bind(this, function() { 
                this.disableHotcorners();
            }));
        }
    },
    
    enableHotcorners: function() {
        if(this._id) {
            // disconnect the callback and recreate the hot corners
            Main.layoutManager.disconnect(this._id);
            Main.layoutManager._updateHotCorners();
        }
    },
    
    destroy: function() {
       this._id = null; 
    }
    
});
