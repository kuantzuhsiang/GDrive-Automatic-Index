var data = [];

function ListNamedFilesandFoldersRecursively() {
  //replace baseFolder variable with the folder name of the starting directory
  var baseFolder = 'foldername';

  var sheet = initSheet();
  var baseFolderIterator = DriveApp.getFoldersByName(baseFolder);
  
//  Logger.log(baseFolderIterator);
  var baseFolder = baseFolderIterator.next();
//  Logger.log(baseFolder);
  LookForFiles(baseFolder, baseFolder.getFiles(), sheet);
//  LookForSubFolders(baseFolder.getFolders(), sheet);
}

//creates table header and clears the existing sheet
function initSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  sheet.appendRow(["Folder","Name", "Date Last Updated", "Size", "URL", "Description", "Type"]);
  return sheet;
}

//recursively look for files in a folder, once no new files are found, looks for subfolders
function LookForFiles(folder, myFiles, sheet) {
  if (myFiles.hasNext()) {
    var myFile = myFiles.next();
    var fileName = myFile.getName();
    var fileDate = myFile.getLastUpdated();
    var fileSize = myFile.getSize();
    var fileUrl = myFile.getUrl();
    var filedesc = myFile.getDescription();
    var fileType = myFile.getMimeType();
    
    data = [
      folder,
      fileName,
      fileDate,
      fileUrl,
      filedesc,
      fileType
    ];
    sheet.appendRow(data);
    
    //Logger.log(fileName);
    LookForFiles(folder, myFiles, sheet);
  } else {  
//    Logger.log(folder)
    try {
//      Logger.log(folder);
      var subFolders = folder.getFolders();
//      Logger.log(subFolders);
      LookForSubFolders(subFolders, sheet);
    } catch(error) {
      Logger.log(error);
    }      
  }
}

//recursively look for subfolders
function LookForSubFolders(subFolders, sheet) {
  if (subFolders.hasNext()) {
    //Logger.log(subFolders.next());
    var nextSubFolder = subFolders.next();
    LookForFiles(nextSubFolder, nextSubFolder.getFiles(), sheet);
    LookForSubFolders(subFolders, sheet);
  }
}