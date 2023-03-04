const typeSelect = document.getElementById("type");
const materialSelect = document.getElementById("material");
const processingMethodSelect = document.getElementById("processingMethod");
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const priceInput = document.getElementById("price");
let prevType = null;

const onTypeChange = () => {
  const defaultMaterialOption = document.createElement("option");
  defaultMaterialOption.text = "jokia";
  defaultMaterialOption.value = "null";

  const defaultProcessinglOption = document.createElement("option");
  defaultProcessinglOption.text = "joks";
  defaultProcessinglOption.value = "null";

  switch (typeSelect.value) {
    case "oakLines":
    case "oakGeometry":
      if (prevType !== "oakLines" && prevType !== "oakGeometry") {
        // set material options
        materialSelect.innerHTML = null;
        const blbMaterialOption = document.createElement("option");
        blbMaterialOption.text = "BLB";
        blbMaterialOption.value = "blb";

        materialSelect.add(defaultMaterialOption);
        materialSelect.add(blbMaterialOption);

        // set processing method options
        processingMethodSelect.innerHTML = null;
        const blbOilingOption = document.createElement("option");
        blbOilingOption.text = "Alyvavimas";
        blbOilingOption.value = "oiling";

        const blbStainingOption = document.createElement("option");
        blbStainingOption.text = "Beicavimas/lakavimas";
        blbStainingOption.value = "blbStaining";

        processingMethodSelect.add(defaultProcessinglOption);
        processingMethodSelect.add(blbOilingOption);
        processingMethodSelect.add(blbStainingOption);
      }

      calculateResult();
      break;
    default:
      if (
        prevType === null ||
        prevType === "oakLines" ||
        prevType === "oakGeometry"
      ) {
        // set material options
        materialSelect.innerHTML = null;
        const mdfOption = document.createElement("option");
        mdfOption.text = "MDF";
        mdfOption.value = "mdf";

        materialSelect.add(defaultMaterialOption);
        materialSelect.add(mdfOption);

        // set processing method options
        processingMethodSelect.innerHTML = null;
        const mdfStainingOption = document.createElement("option");
        mdfStainingOption.text = "MDF dažymas 20% MAT";
        mdfStainingOption.value = "mdfStaining";

        processingMethodSelect.add(defaultProcessinglOption);
        processingMethodSelect.add(mdfStainingOption);
      }

      calculateResult();
      break;
  }
  prevType = typeSelect.value;
};

const calculateResult = () => {
  let materialPrice = 0;
  let millingCost = 0;
  let processingCost = 0;
  let price = 0;
  if (
    typeSelect.value === "null" ||
    +lengthInput.value <= 0 ||
    +widthInput.value <= 0
  )
    return (priceInput.value = 0);

  let area = (+lengthInput.value / 1000) * (+widthInput.value / 1000);
  switch (typeSelect.value) {
    case "elegancija6":
      materialPrice = 10;
      millingCost = 12;
      processingCost = 50;
      break;
    case "elegancija4":
      materialPrice = 10;
      millingCost = 15;
      processingCost = 50;
      break;
    case "elegancija3":
      materialPrice = 10;
      millingCost = 16;
      processingCost = 50;
      break;
    case "elegancija2,5":
      materialPrice = 10;
      millingCost = 17;
      processingCost = 50;
      break;
    case "piramides":
      materialPrice = 18;
      millingCost = 33;
      processingCost = 60;
      break;
    case "daimond":
      materialPrice = 18;
      millingCost = 35;
      processingCost = 60;
      break;
    case "kvadratas":
    case "modernLines":
      materialPrice = 10;
      millingCost = 38;
      processingCost = 50;
      break;
    case "illusionCube":
      materialPrice = 10;
      millingCost = 60;
      processingCost = 50;
      break;
    case "oakLines":
    case "oakGeometry":
      materialPrice = 30;
      millingCost = 54;
      if (processingMethodSelect.value === "oiling") processingCost = 12;
      if (processingMethodSelect.value === "blbStaining") processingCost = 30;
      break;
    default:
      break;
  }

  price = millingCost * area;

  if (materialSelect.value !== "null") price += materialPrice * area;
  if (processingMethodSelect.value !== "null") price += processingCost * area;
  // add PVM and Kof
  price = price * 1.21 * 1.15;
  priceInput.value = Math.round(price);
};
