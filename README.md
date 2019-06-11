# GDrive-Automatic-Index
Javascript code to be used with Google scripts to index a Google folder and list all files contained within it in a Google Spreadsheet

To use this script follow the following steps:

1. Open a new Google spreadsheet

2. Click Tools > Script editor

3. In the Script editor window delete all existing code and paste all the code from the file "FindGDriveFilesRecursively.js"

4. Change the variable baseFolder to the name of the starting folder where the indexing should commence

5. Save the script and return to the Google Spreadsheet

6. Click Tools > Macros > Import

7. Select and import "ListNamedFilesandFoldersRecursively"

8. Click Tools > Macros > ListNamedFilesandFoldersRecursively

9. Watch the magic happen

<b>NOTE:</b> You will be asked to give permission to access your GDrive the first time you run the script, based on your browser settings,
it may also warn you to return back to safety back just ignore it and (if you are using Chrome) scroll down click 'advanced' and then
'proceed' 
