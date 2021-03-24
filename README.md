# nox-macro

An editor for Nox android emulator macros.

Nox itself lets you record a series of clicks or actions, but provides no means (to my knowledge) of
editing an existing macro other than complete re-recording. This tool aims to provide a friendlier
means of adjusting timing and refining macros.

As these macros are stored in a plaintext format, anyone with a text editor and some familiarity
with the proprietary format could edit them directly. Unfortunately, all actions use absolute
timestamps, so a single edit near the start of a long macro will require cascading updates to all
lines that follow. It can make for a rather tedious undertaking at best.

## Usage

on windows, Nox macro related files are stored at
```
%LOCALAPPDATA%\nox\records
```
The macro files have random(-ish) names (i.e. unique ids generated to avoid collision) and no
extension. The exception is the `record` file, which stores metadata about all macros in `json`
format. By updating the `record` file, recognizable filenames can be given to macro files if desired.

Click 'Select File' and pick the desired macro file from the directory above.

Use 'Load' to replace any current editor contents with the file you've selected.

Use 'Import' to add the contents of the file after the action currently selected in the editor.

Click/select items in the action list to edit their values or enable deletion (using the trash can

icon).
Drag items in the action list to reorder them.
