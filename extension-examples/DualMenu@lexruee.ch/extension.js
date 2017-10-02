
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Lang = imports.lang;

let button;
 
const Menu = new Lang.Class({
    Name: 'Menu',

    _init: function(sourceActor) {
        this.actor = new PopupMenu.PopupMenu(sourceActor, 1.0, St.Side.TOP);

        this._leftMenu = new PopupMenu.PopupMenuSection();
        let item = new PopupMenu.PopupMenuItem(_("Left Menu Item 1"));                                                                                    
        this._leftMenu.addMenuItem(item);                                                 
        item = new PopupMenu.PopupMenuItem(_("Left Menu Item 2"));             
        this._leftMenu.addMenuItem(item);   

        this._rightMenu = new PopupMenu.PopupMenuSection();
        item = new PopupMenu.PopupMenuItem(_("Right Menu Item 1"));                                                                                    
        this._rightMenu.addMenuItem(item);                                                 
        item = new PopupMenu.PopupMenuItem(_("Right Menu Item 2"));             
        this._rightMenu.addMenuItem(item);   
         
        this.actor.addMenuItem(this._leftMenu);
    },

    useLeftMenu: function() {
        if (this.actor.firstMenuItem == this._rightMenu) {
            this.actor.box.remove_actor(this._rightMenu.actor);
            this.actor.box.add_actor(this._leftMenu.actor);
        }
    },

    useRightMenu: function() {
        if (this.actor.firstMenuItem == this._leftMenu) {
            this.actor.box.remove_actor(this._leftMenu.actor);
            this.actor.box.add_actor(this._rightMenu.actor);
        }
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
        this._menu = new Menu(this.actor);
        this.setMenu(this._menu.actor);
        Main.panel.menuManager.addMenu(this._menu.actor);
        this.actor.connect('button-press-event', Lang.bind(this, this._onButtonKeyPress));
    },

    _onButtonKeyPress: function(actor, event) {
        let button = event.get_button();
        if (button == 1) {
            log('left click!');
            this._menu.useLeftMenu();
        } else if (button == 3) {
            this._menu.useRightMenu();
            log('right click!');
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
