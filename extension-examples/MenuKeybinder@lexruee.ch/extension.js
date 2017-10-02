/*
 * MenuKeybinder - A working demo that shows how the panel-main-menu
 * can be bound to the super key.
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

const SUPER_L = 'Super_L';

// Initialize variables
let menuKeybinder;

function init() {
}

function enable() {
    new Helper.MenuKeybinder(SUPER_L).enable();
}

function disable() {
    new Helper.MenuKeybinder(SUPER_L).disable();
}
