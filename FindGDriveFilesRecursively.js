var data = [];

function ListNamedFilesandFoldersRecursively() {
  //replace baseFolder variable with the folder name of the starting directory
  var baseFolder = 'foldername';
  
  var sheet = initSheet();
  var baseFolderIterator = DriveApp.getFoldersByName(baseFolder);
  var folderName = "";
  
//  Logger.log(baseFolderIterator);
  
  var baseFolder = baseFolderIterator.next();
//  folderName = String(baseFolder);
//  Logger.log(fileName);
//  Logger.log(baseFolder);
  LookForFiles(folderName, baseFolder, baseFolder.getFiles(), sheet);
}

//creates table header and clears the existing sheet
function initSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  sheet.appendRow(["Folder","Name", "Date Last Updated", "Owner", "Size", "URL", "Description", "Type"]);
  return sheet;
}

//recursively look for files in a folder, once no new files are found, looks for subfolders
function LookForFiles(folderName, folder, myFiles, sheet) {
  try {
	  if (myFiles.hasNext()) {        
        if (folderName.indexOf('/') != -1) {
          var i = folderName.lastIndexOf('/');
          var tmpName = folderName.substring(i + 1);
          if (tmpName != folder) {
            folderName = folderName + '/' + folder;
          }
        } else {
          folderName = folderName + '/' + folder;
        }
        
	    var myFile = myFiles.next();
	    var fileName = myFile.getName();
	    var fileDate = myFile.getLastUpdated();
	    var fileOwner = myFile.getOwner();
	    var fileSize = myFile.getSize();
	    var fileUrl = myFile.getUrl();
	    var fileDesc = myFile.getDescription();
	    var fileType = myFile.getMimeType();
	    
	    data = [
	      folderName,
	      fileName,
	      fileDate,
	      fileOwner,
	      fileSize,
	      fileUrl,
	      fileDesc,
	      fileType
	    ];
	    sheet.appendRow(data);
	    
	    //Logger.log(fileName);
	    LookForFiles(folderName, folder, myFiles, sheet);
	  } else {
	//    Logger.log(folder)
	    
	    try {
	//      Logger.log(folder);
	      var subFolders = folder.getFolders();
	//      Logger.log(subFolders);
          
	      LookForSubFolders(folderName, subFolders, sheet);
	    } catch(error) {
	      Logger.log(error);
	    }      
	  }
  } catch (error) {
	try {
	//      Logger.log(folder);
      var subFolders = folder.getFolders();
	//      Logger.log(subFolders);
      
      folderName = folderName + '/' + folder;
      LookForSubFolders(folderName, subFolders, sheet);
    } catch(error) {
      Logger.log(error);
    }	
  }
}

//recursively look for subfolders
function LookForSubFolders(folderName, subFolders, sheet) {
  if (subFolders.hasNext()) {
    //Logger.log(subFolders.next());
    var nextSubFolder = subFolders.next();

    LookForFiles(folderName, nextSubFolder, nextSubFolder.getFiles(), sheet);
    LookForSubFolders(folderName, subFolders, sheet);
  }
}