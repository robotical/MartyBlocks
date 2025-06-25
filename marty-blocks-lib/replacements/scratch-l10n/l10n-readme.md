How Translations Are Managed

Translations are added in three phases:
	1.	Block translations
	2.	Interface translations
	3.	Extension translations

	•	Interface and extension translations are referenced directly from within the scratch-l10n repository and used by the application.
	•	Block translations, however, must be copied into the scratch-blocks repository. This copying is handled automatically when running buildAllAndStart l10n-gui.

⸻

🧩 Steps to Add New Translations (Interface or Extensions)
	1.	Add base strings
Add your new English strings to:
scratch-l10n/editor/custom/en.json
	2.	Convert to CSV for translation
Run: `node marty-blocks-lib/replacements/scratch-l10n/localizations-to-csv.cjs`

This will create a CSV file that can be imported into Google Sheets.

	3.	Translate via Google Sheets
	•	Open the CSV in Google Sheets.
	•	Add a column for each new language you want to support.
	•	Translate the strings in the appropriate columns.
	4.	Export the Google Sheet as CSV
	5.	Save the CSV
Save the exported file back to the same location where it was originally generated.
	6.	Generate language JSON files
Run: `node marty-blocks-lib/replacements/scratch-l10n/csv-to-localizations.cjs`

This will generate one .json file per language column.

	7.	Build and preview the result
Run: `buildAllAndStart l10n-gui`

This will build the l10n GUI and launch the application with the new translations.

⸻

🧱 Special Notes for Block Translations
	•	The process is mostly the same as above.
	•	The only difference: a generated file (scratch_msgs.js) will be automatically copied from scratch-l10n to scratch-blocks when running buildAllAndStart l10n-gui.
	•	Important: Ensure any new keys you introduce also exist in:
marty-blocks-lib/replacements/scratch-blocks/msg/messages.js

⚠️ Common Issue

Google Translate sometimes changes placeholders like %1 to % 1.
Make sure to search and replace any such broken placeholders in the Google Sheet before exporting.