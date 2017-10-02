
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Lang = imports.lang;

let button;
 
const LeftMenu = new Lang.Class({
    Name: 'LeftMenu',
    Extends: PopupMenu.PopupMenu,

    _init: function(sourceActor) {
        this.parent(sourceActor, 1.0, St.Side.TOP);
        let item = new PopupMenu.PopupMenuItem(_("Menu Item 1"));
        this.addMenuItem(item);
        item = new PopupMenu.PopupMenuItem(_("Menu Item 2"));
        this.addMenuItem(item);
    },

    isEmpty: function() {
	    return false;
    }
});

const PanelButton = new Lang.Class({
    Name: 'MyPanelButton',
    Extends: PanelMenu.Button,

    _init: function() {
        this.parent(1.0, null, false);
        this.icon = new St.Icon({ 
            icon_name: 'system-run-symbolic',
            style_class: 'system-status-icon' 
        });
        this._bin = new St.Bin({ 
            style_class: 'panel-button',
            reactive: true,
            can_focus: true,
            x_fill: true,
            y_fill: false,
            track_hover: true, 
            child: this.icon
        });
        this.actor.add_actor(this._bin);
        this._leftMenu = new LeftMenu(this.actor);
        this.setMenu(this._leftMenu);
        Main.panel.menuManager.addMenu(this.menu);
        this.actor.connect('button-press-event', Lang.bind(this, this._onButtonKeyPress));
    },

    _onButtonKeyPress: function(actor, event) {
        let button = event.get_button();
        if (button == 1) {
            log('left click!');
            //this.setMenu(this._leftMenu);
        } else if (button == 3) {
            log('right click!');
            //this.setMenu(this._rightMenu);
        }
        return Clutter.EVENT_PROPAGATE;
    },

    destroy: function() {
        this.menu.actor.get_children().forEach(function(c) {
            c.destroy();
        });
        this.parent();
    }
});


function init() {
}

function enable() {
    button = new PanelButton();
    Main.panel.addToStatusArea('test-menu', button, 0, 'left');
}

function disable() {
    Main.panel.menuManager.removeMenu(button.menu);
    Main.panel.statusArea['test-menu'] = null;
    button.destroy();
    button = null;
}
