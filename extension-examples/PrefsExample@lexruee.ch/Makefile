JS=*.js
MD=*.md
JSON=*.json
TXT=COPYING
DEST=~/.local/share/gnome-shell/extensions/PrefsExample@lexruee.ch
DIRS=schemas

compile:
	glib-compile-schemas ./schemas

install: compile
	mkdir -p $(DEST)
	cp $(JS) $(JSON) $(MD) $(TXT) $(DEST)
	cp -r $(DIRS) $(DEST)

uninstall:
	rm -rf $(DEST)
