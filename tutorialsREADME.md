 Creating a New Tutorial for MartyBlocksThis guide explains how to add a new tutorial (lesson) to MartyBlocks.
 ## 1. Create a New Tutorial File- Navigate to:
  `marty-blocks-lib/replacements/scratch-gui/src/lib/libraries/decks/general-lessons/`
- Copy an existing tutorial file (e.g., `cog-and-marty-dummy.js`) and rename it for your new tutorial.## 2. Edit the Tutorial File- Update the exported object:
  - Change the `id`, `name`, `type`, `urlId`, `description`, `img`, `tags`, and `collaborator` fields as needed.
  - Add or modify the `steps` array to define the tutorial flow.
    - Each step can include:
      - `type`: e.g., "info", "end"
      - `description`: Use `<FormattedMessage />` for i18n support.
      - `image`: (optional) URL to an image for the step (we use aws bucket).
      - `nextStepActions`: (optional) UI actions (see other tutorials for examples).
      - `expectedCode`: (optional) Array of block sequences to check for in the workspace.
      - `hint`: (optional) Hints for the user.## 3. Add Images- Upload any images referenced in your tutorial to the appropriate S3 bucket or public URL.
- Reference images in your steps using the `img` or `image` fields.## 4. Register the Tutorial- Open:
  `marty-blocks-lib/replacements/scratch-gui/src/lib/libraries/decks/index.jsx`
- Import your new tutorial at the top.
- Add it to the exported object, e.g.:
  ```js
  import myNewTutorial from './general-lessons/my-new-tutorial';
  // ...existing code...
  export default {
      ...myNewTutorial,
      // ...existing code...
  }
  ```## 5. Test- Run the app and verify your tutorial appears and works as expected.## 6. Tips- Use `<FormattedMessage />` for all user-facing text for localization.
- Use the `steps` array to guide users through the tutorial, using actions and hints as needed.
- Look at existing tutorials for examples of best practices.---## File Responsibilities Summary**`LessonUIHelper.js`**
Located at: `marty-blocks-lib/replacements/scratch-gui/src/components/lessons/LessonUIHelper.js`
- Provides static helper methods for UI interactions in tutorials, such as highlighting blocks or elements, animating block movements, and managing highlights.**`LessonEngine.js`**
Located at: `marty-blocks-lib/replacements/scratch-gui/src/components/lessons/LessonEngine.js`
- Orchestrates the tutorial step logic, handling actions (like highlighting or animating), step transitions, and code evaluation for tutorial progress.**`cog-and-marty-dummy.js`**
Located at: `marty-blocks-lib/replacements/scratch-gui/src/lib/libraries/decks/general-lessons/cog-and-marty-dummy.js`
- Example tutorial definition file. Exports a tutorial object with metadata and an array of steps, each describing UI actions, hints, and code checks.**`index.jsx`**
Located at: `marty-blocks-lib/replacements/scratch-gui/src/lib/libraries/decks/index.jsx`
- Central registry for all tutorials and how-tos. Imports and aggregates tutorial objects for use in the app's tutorial system.


