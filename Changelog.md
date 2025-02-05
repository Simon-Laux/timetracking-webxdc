# Changelog

## Unreleased

- add button to take over start date to end date to the create entry screen.
- enable label autocompletion feature by default and remove the setting for it.

## 0.9.0

- feat: a way to pause active task from tasks list.
  This allows to pause / unpause task by using just spacebar
- fix: going to "Statistics" crashing the app sometimes

## 0.8.0

- small style fixes for stats view on small screens
- add autocomplete support in create and edit entry page
- fix month and week stats at year border (from other years than the current one) #50

## 0.7.0

- fix scrolling stuttering bug on iOS
- add confirmation dialog when deleting entry from entry page
- tidy up entries page (put view options in menu in header)
- add option to create entries manually

## 0.6.0

- fix typo in "why is my month missing" dialog
- fix weird sidewards overscrolling bug in statistics/weekPage
- add "Time spend by task" to Statistics
- move to react-router for routing
- add yesterday to quickstats
- new entries tab design
- improved edit entry design
- show edit entry errors to user

## 0.5.0

- add Stats for time on days in week/month
- Introducing the Statistics tab
- make "simons bot format" an devmode option (hidden by default)
- move licenses to own credits page
- move devmode to credits page
- move import/export to new backup page
- improve backup page
- move about and options to dedicated pages
- improve about page
- show version on more page

## 0.4.0

- fix: edit entry form visually bugs back to previous state
- changed: use webxdc types npm package
- optimize icon

## 0.3.0

- fix: process out of order updates again

## 0.2.0

- manifest: simplify description and remove version property
- add an icon
- add option to hide Stats Summary on Track Page
- fix: ignore adding entries that already exist
- fix: stats on track page on small devices
- fix: disable bounce scrolling where not appropriate (iOS)
- fix: remove useless scrollbars on desktop on non-mac

## 0.1.0

- Initial Public release
