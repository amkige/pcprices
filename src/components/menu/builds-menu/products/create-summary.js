import { CanvasTable } from "canvas-table";
import { CURRENCY } from "@/const";
import stringifyPrice from "@/utils/stringifyPrice";

export default async function (products, buildTotalPrice) {
  const columns = [
    { title: "Retailer", options: { textAlign: "left" } },
    { title: "QTY", options: { textAlign: "center" } },
    { title: "Name" },
    { title: "Price" },
    { title: "Total", options: { textAlign: "right" } },
  ];

  const data = products.map((product) => [
    product.retailerName,
    product.qty,
    [product.name.full || product.name, { image: product.thumb, width: 42 }],
    `${CURRENCY} ${product.price}`,
    `${CURRENCY} ${product.totalPrice}`,
  ]);

  data.push([
    [
      "",
      {
        image: require("@/assets/logo/default.svg"),
        scale: 0.3,
      },
    ],
    "",
    "",
    "",
    [
      `${CURRENCY} ${stringifyPrice(buildTotalPrice)}`,
      { fontSize: 16, fontWeight: "500" },
    ],
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 15 + 35 + data.length * 50;

  const config = {
    columns,
    data,
    options: {
      header: {
        fontWeight: "normal",
        fontFamily: "Inter Var",
        color: "#808080",
      },
      cell: {
        fontWeight: "normal",
        fontFamily: "Inter Var",
        color: "#000",
        lineHeight: 1.5,
        padding: 15,
      },
      devicePixelRatio: 1.4,
      fit: true,
      fader: {},
      borders: {
        column: undefined,
        header: undefined,
      },
      padding: {
        top: 10,
        bottom: 10,
        right: 5,
        left: 5,
      },
    },
  };

  const ct = new CanvasTable(canvas, config);
  await ct.generateTable();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve));
  return URL.createObjectURL(blob);
}
