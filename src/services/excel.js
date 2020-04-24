import { ExportToCsv } from 'export-to-csv';

export default function toExcel(data, filename = 'po_export') {
  console.log({ data });

  const exporter = new ExportToCsv({
    filename,
    useKeysAsHeaders: true,
  });

  exporter.generateCsv(data);
}
