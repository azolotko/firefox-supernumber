browser.commands.onCommand.addListener(async function(command) {
    const tabs = await browser.tabs.query({ currentWindow: true, hidden: false});

    const activeIdx = tabs.findIndex(tab => tab.active);
    var activateIdx = activeIdx;

    if (command == "switch-tab-previous") {
        if (activeIdx - 1 < 0)
            activateIdx = tabs.length - 1;
        else
            activateIdx = activeIdx - 1;
    } else if (command == "switch-tab-next") {
        if (activeIdx + 1 >= tabs.length)
            activateIdx = 0;
        else
            activateIdx = activeIdx + 1;
    } else {
        activateIdx = Math.min(command.slice(-1) % 9 - 1, tabs.length - 1);
    }

    const tab = tabs[activateIdx];
    tab && browser.tabs.update(tab.id, { active: true });
});
