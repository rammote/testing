 const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
  
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  
  const ExportToCsv = (e, fileName, headers, usersData)=> {
    e.preventDefault();
    downloadFile({
      data: [...headers, ...usersData].join("\n"),
      fileName: `${fileName}.csv`,
      fileType: "text/csv",
    });
  };

  const ExportToJson = (e, usersData, fileName) => {
    e.preventDefault();
    console.log("Downloading JSON file...");
     downloadFile({
      data: JSON.stringify(usersData),
      fileName: `${fileName}.json`,
      fileType: "text/json",
    });
  };
  

export  { ExportToCsv, ExportToJson };