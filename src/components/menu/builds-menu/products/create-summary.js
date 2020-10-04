import { CanvasTable } from "canvas-table";
import { CURRENCY } from "@/const";

export default async function (products, buildTotalPrice) {
  const columns = [
    { title: "QTY" },
    { title: "Name" },
    { title: `Price (${CURRENCY})` },
    { title: `Total Price (${CURRENCY})` },
    { title: "Retailer", options: { textAlign: "right" } },
  ];

  const data = products.map((product) => [
    product.qty.toString(),
    product.name,
    product.price.toString(),
    product.totalPrice.toString(),
    product.retailerName,
  ]);

  const emptyRow = ["", "", "", "", ""];
  data.push(emptyRow, ["TOTAL", "", "", "", `${CURRENCY} ${buildTotalPrice}`]);

  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 80 + data.length * 25;

  const config = {
    columns,
    data,
    options: {
      fit: true,
      fader: {},
      title: {
        text: location.origin,
        lineHeight: 1.5,
      },
    },
  };

  const ct = new CanvasTable(canvas, config);
  await ct.generateTable();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve));
  return URL.createObjectURL(blob);
}
