/**
{george: {
  "Algorithms": [...],
  "Analysis": [...],
  "Decomposition": [...],
  "Generalisation and Abstraction": [...],
  "Pattern Recognition and Data Representation": [...],
  "Dates": [...],
  "Average": ...[]
},
michael: {
  "Algorithms": [...],
  "Analysis": [...],
  "Decomposition": [...],
  "Generalisation and Abstraction": [...],
  "Pattern Recognition and Data Representation": [...],
  "Dates": [...],
  "Average": ...[]
}
 */

function prepareCSVData(data) {
  if (!data) return;
  if (Object.keys(data).length === 0) return;
  const csvData = [];
  for (const studentName in data) {
    const headers = Object.keys(data[studentName]);
    // sort so that Dates is first
    headers.sort((a, b) => {  
      if (a === "Dates") return -1;
      if (b === "Dates") return 1;
      return a.localeCompare(b);
    });
    const studentData = data[studentName];
    csvData.push([studentName]);
    csvData.push(headers);
    const rows = [];
    for (let i = 0; i < studentData["Dates"].length; i++) {
      const row = [];
      for (const header of headers) {
        row.push(studentData[header][i]);
      }
      rows.push(row);
    }
    csvData.push(...rows);
  }
  return csvData;
}

function createBlobFromCSVData(csvData) {
  const csvString = csvData.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  return blob;
}

function downloadCSVFile(blob, filename) {
  // Create a link to download it
  let link = document.createElement("a");
  if (link.download !== undefined) {
    let url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportCSVData(rawData, filename) {
  const csvData = prepareCSVData(rawData);
  console.log("csvData", csvData)
  const blob = createBlobFromCSVData(csvData);
  downloadCSVFile(blob, filename);
}