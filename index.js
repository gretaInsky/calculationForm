const typeSelect = document.getElementById("type");
const materialSelect = document.getElementById("material");
const processingMethodSelect = document.getElementById("processingMethod");
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const priceInput = document.getElementById("price");
let prevType = null;

const onTypeChange = (lang) => {
  const defaultMaterialOption = document.createElement("option");
  const defaultProcessingOption = document.createElement("option");
  const noneMaterialOption = document.createElement("option");
  const noneProcessinglOption = document.createElement("option");

  defaultMaterialOption.value = "null";
  defaultProcessingOption.value = "null";
  noneMaterialOption.value = "null";
  noneProcessinglOption.value = "null";

  defaultMaterialOption.disabled = true;
  defaultProcessingOption.disabled = true;

  defaultMaterialOption.selected = true;
  defaultProcessingOption.selected = true;

  //set text language
  switch (lang) {
    case "lt":
      defaultMaterialOption.text = "išsirinkti..";
      defaultProcessingOption.text = "išsirinkti..";
      noneMaterialOption.text = "be medžiagos (savo)";
      noneProcessinglOption.text = "be apdirbimo";
      break;

    case "en":
      defaultMaterialOption.text = "choose..";
      defaultProcessingOption.text = "choose..";
      noneMaterialOption.text = "without material (own)";
      noneProcessinglOption.text = "without processing";
      break;

    default:
      defaultMaterialOption.text = "išsirinkti..";
      defaultProcessingOption.text = "išsirinkti..";
      noneMaterialOption.text = "be medžiagos (savo)";
      noneProcessinglOption.text = "be apdirbimo";
      break;
  }

  switch (typeSelect.value) {
    case "oakVeneerLines":
    case "oakVeneerArt":
      if (prevType !== "oakVeneerLines" && prevType !== "oakVeneerArt") {
        materialSelect.innerHTML = null;
        processingMethodSelect.innerHTML = null;

        const blbMaterialOption = document.createElement("option");
        const blbOilingOption = document.createElement("option");
        const blbStainingOption = document.createElement("option");

        blbMaterialOption.value = "blb";
        blbOilingOption.value = "oiling";
        blbStainingOption.value = "blbStaining";

        //set text language
        switch (lang) {
          case "lt":
            blbMaterialOption.text = "BLB";
            blbOilingOption.text = "Alyvavimas";
            blbStainingOption.text = "Beicavimas/lakavimas";
            break;

          case "en":
            blbMaterialOption.text = "BLB";
            blbOilingOption.text = "Oiling";
            blbStainingOption.text = "Staining/varnishing";
            break;

          default:
            blbMaterialOption.text = "BLB";
            blbOilingOption.text = "Alyvavimas";
            blbStainingOption.text = "Beicavimas/lakavimas";
            break;
        }

        materialSelect.add(defaultMaterialOption);
        materialSelect.add(noneMaterialOption);
        materialSelect.add(blbMaterialOption);
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
        materialSelect.innerHTML = null;
        processingMethodSelect.innerHTML = null;

        const mdfOption = document.createElement("option");
        const mdfStainingOption = document.createElement("option");

        mdfOption.value = "mdf";
        mdfStainingOption.value = "mdfStaining";

        //set text language
        switch (lang) {
          case "lt":
            mdfOption.text = "MDF";
            mdfStainingOption.text = "MDF dažymas 20% MAT";
            break;

          case "en":
            mdfOption.text = "MDF";
            mdfStainingOption.text = "MDF dyeing 20% MAT";
            break;
          default:
            break;
        }

        materialSelect.add(defaultMaterialOption);
        materialSelect.add(noneMaterialOption);
        materialSelect.add(mdfOption);

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
