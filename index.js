const typeSelect = document.getElementById("type");
const materialSelect = document.getElementById("material");
const processingMethodSelect = document.getElementById("processingMethod");
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const priceInput = document.getElementById("price");
let prevType = null;

const onTypeChange = () => {
  const defaultMaterialOption = document.createElement("option");
  defaultMaterialOption.text = "išsirinkti..";
  defaultMaterialOption.value = "null";
  defaultMaterialOption.disabled = true;
  defaultMaterialOption.selected = true;

  const defaultProcessingOption = document.createElement("option");
  defaultProcessingOption.text = "išsirinkti..";
  defaultProcessingOption.value = "null";
  defaultProcessingOption.disabled = true;
  defaultProcessingOption.selected = true;

  const noneMaterialOption = document.createElement("option");
  noneMaterialOption.text = "be medžiagos (savo)";
  noneMaterialOption.value = "null";

  const noneProcessinglOption = document.createElement("option");
  noneProcessinglOption.text = "be apdirbimo";
  noneProcessinglOption.value = "null";

  switch (typeSelect.value) {
    case "oakVeneerLines":
    case "oakVeneerArt":
      if (prevType !== "oakVeneerLines" && prevType !== "oakVeneerArt") {
        // set material options
        materialSelect.innerHTML = null;
        const blbMaterialOption = document.createElement("option");
        blbMaterialOption.text = "BLB";
        blbMaterialOption.value = "blb";

        materialSelect.add(defaultMaterialOption);
        materialSelect.add(noneMaterialOption);
        materialSelect.add(blbMaterialOption);

        // set processing method options
        processingMethodSelect.innerHTML = null;
        const blbOilingOption = document.createElement("option");
        blbOilingOption.text = "Alyvavimas";
        blbOilingOption.value = "oiling";

        const blbStainingOption = document.createElement("option");
        blbStainingOption.text = "Beicavimas/lakavimas";
        blbStainingOption.value = "blbStaining";

        processingMethodSelect.add(defaultProcessingOption);
        processingMethodSelect.add(noneProcessinglOption);
        processingMethodSelect.add(blbOilingOption);
        processingMethodSelect.add(blbStainingOption);
      }

      calculateResult();
      break;
    default:
      if (
        prevType === null ||
        prevType === "oakVeneerLines" ||
        prevType === "oakVeneerArt"
      ) {
        // set material options
        materialSelect.innerHTML = null;
        const mdfOption = document.createElement("option");
        mdfOption.text = "MDF";
        mdfOption.value = "mdf";

        materialSelect.add(defaultMaterialOption);
        materialSelect.add(noneMaterialOption);
        materialSelect.add(mdfOption);

        // set processing method options
        processingMethodSelect.innerHTML = null;
        const mdfStainingOption = document.createElement("option");
        mdfStainingOption.text = "MDF dažymas 20% MAT";
        mdfStainingOption.value = "mdfStaining";

        processingMethodSelect.add(defaultProcessingOption);
        processingMethodSelect.add(noneProcessinglOption);
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
    case "elegantLines6":
      materialPrice = 10;
      millingCost = 12;
      processingCost = 65;
      break;
    case "elegantLines4":
      materialPrice = 10;
      millingCost = 15;
      processingCost = 65;
      break;
    case "elegantLines3":
      materialPrice = 10;
      millingCost = 16;
      processingCost = 65;
      break;
    case "elegantLines25":
      materialPrice = 10;
      millingCost = 17;
      processingCost = 65;
      break;
    case "graphicPyramids":
      materialPrice = 18;
      millingCost = 33;
      processingCost = 75;
      break;
    case "unrealDaimond":
      materialPrice = 18;
      millingCost = 35;
      processingCost = 75;
      break;
    case "contourSquares":
    case "classyLines":
      materialPrice = 10;
      millingCost = 38;
      processingCost = 65;
      break;
    case "jazzyCube":
      materialPrice = 10;
      millingCost = 48;
      processingCost = 65;
      break;
    case "oakVeneerLines":
      materialPrice = 30;
      millingCost = 38;
      if (processingMethodSelect.value === "oiling") processingCost = 12;
      if (processingMethodSelect.value === "blbStaining") processingCost = 45;
      break;
    case "oakVeneerArt":
      materialPrice = 30;
      millingCost = 42;
      if (processingMethodSelect.value === "oiling") processingCost = 12;
      if (processingMethodSelect.value === "blbStaining") processingCost = 45;

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
