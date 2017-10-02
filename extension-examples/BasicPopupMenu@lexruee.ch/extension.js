const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const St = imports.gi.St;
 
let button;
const role = 'popup-menu-example';
 
function init() {

}
 
function enable() {
    button = new PanelMenu.Button(St.Align.START, 'Text', false);
    let icon = new St.Icon({
        icon_name: 'dialog-error',
        style_class: 'system-status-icon'
    });
    button.actor.add_actor(icon);
    button.menu.actor.set_opacity(0);
 
    let item1 = new PopupMenu.PopupMenuItem('Sample item 1');
    let item2 = new PopupMenu.PopupMenuItem('Sample item 2');
    button.menu.addMenuItem(item1);
    button.menu.addMenuItem(item2);
    Main.panel._rightBox.insert_child_at_index(button.container, 0);
}
 
function disable() {
    Main.panel._rightBox.remove_child(button.container);
    button.emit('destroy');
    button = null;
}


