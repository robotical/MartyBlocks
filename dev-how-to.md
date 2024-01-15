### How to add a new modal
##### RELEVANT FILES: 
- scratch-gui/src/reducers/modals.js
- scratch-gui/src/components/gui/gui.jsx

1. Add a new modal to the modals reducer in `scratch-gui/src/reducers/modals.js`
1.1 Modal name
1.2 Initial state to false
1.3 Open/Close function
1.4 Export Open/Close functions

2. Create Modal Component in `scratch-gui/src/components/`
Comment: needs updating



### How to add a new Draggable modal

1. Create a new component in `scratch-gui/src/components/` that will be the CTA for the draggable modal (e.g., a button)
2. Create the question mark icon of the CTA in (optional -- can use an inline function as well). This is the children of the CTA component.
3. Create a new component in `scratch-gui/src/components/` that will be the content of the draggable modal (optional -- can use an inline function as well)
4. Call this component from the parent-component
