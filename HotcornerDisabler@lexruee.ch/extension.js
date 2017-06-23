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
const Gio = imports.gi.Gio;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const Helper = Me.imports.helper;

let hotcornerManager;

function init() {
    
}

function enable() {
    hotcornerManager = new Helper.HotcornerManager();
    hotcornerManager.disableHotcorners();
}

function disable() {
    hotcornerManager.enableHotcorners();
    hotcornerManager.destroy();
    hotcornerManager = null;
}

