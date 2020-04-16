# workspaces-chrome-extension

Organize your chrome windows by urls - move tabs with same url to the same window

Manage your tabs by grouping tabs from similar domains into a single chrome window.
When Opening a new URL, chrome default behavior is to open the tab in the last active window.
In case you organized your tabs in different windows by some correlation, this behavior will mass things up.
Workspaces lets you configure which URL addresses you want to always open on the same window!

# how to develop

go to chrome://extensions/ in chrome
turn on developer mode
Load unpacked -> [your-git-workspace]\url-to-window-extension\public
npm i
npm run dev
refresh the options page every change you make to apply changes

# how to deploy

upgrade the version field in public\manifest.json
npm run build
zip the 'public' folder
https://chrome.google.com/webstore/devconsole/96c13946-9ff5-41ff-b94e-da7a366627fc/bmmllgcakilokeeepnmhfggdahlnhpek/edit/package?hl=en
upload the zip file

# Resources

https://svelte.dev/docs
https://sveltematerialui.com/
https://materializecss.com/icons.html
