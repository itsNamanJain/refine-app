import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Jimp from "jimp";
const XLSX = require("xlsx");

const UploadExcel = () => {
  const [formValues, seFormValues] = useState({
    excelFile: null,
    name: "",
  });

  const [csvData, setCsvData] = useState([]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    seFormValues({
      // @ts-ignore
      excelFile: e.target?.files[0],
      name: e.target.value,
    });
  };

  const convertCsvToArray = (csv: any) => {
    const rows = csv.split("\n");
    return rows.map((row: any) => row.split(","));
  };

  const generatePdf = (data: any) => {
    const doc = new jsPDF();
    autoTable(doc, { head: [data[0]], body: data.slice(1) });
    const csvFileName = formValues.name.split("\\").pop();
    const fileName = csvFileName?.split(".")[0];
    doc.save(`${fileName}.pdf`);
  };

  async function createCertificate(name: string, index: number) {
    const x = 54; // x-coordinate
    const y = 172; // y-coordinate
    const certificate = await Jimp.read("./certificate.jpeg");
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    certificate.print(font, x, y, name); // Print the name at the specified coordinates

    const outputFilePath = `./certificate-${index}.jpg`; // Define the path to save the file
    await certificate.writeAsync(outputFilePath); // Save the image
    return outputFilePath;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formValues.excelFile) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = async (e: any) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          console.log(jsonData);

          const certificatePromises = jsonData.map((row: any, index: number) =>
            createCertificate(row.Name, index + 1)
          );

          resolve(Promise.all(certificatePromises));
        };

        reader.onerror = () => {
          reject(reader.error);
        };

        reader.readAsArrayBuffer(formValues.excelFile);
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-2/3 flex flex-col border px-6 py-6 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-1 bg-blueGray-50 w-full">
            <p className="text-lg font-bold w-full text-center mb-3">
              Generate Certificates from CSV
            </p>
            <div className="flex w-full items-center my-2">
              <label className="text-sm font-bold mr-4">Csv File</label>
              <input
                type="file"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleOnChange}
                placeholder="name"
                accept=".xls, .xlsx, .csv"
                className="shadow text-sm font-medium border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              <span>Generate Pdf</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadExcel;
