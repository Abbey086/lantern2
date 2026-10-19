/* Boot */
hydrateIcons();
applyTheme();renderJournal();syncControls();updateQuota();
history.replaceState({v:'view-home',d:0},'');
show('view-home');
if(!S.onboarded)openOnboarding();
