const selectRef = document.querySelector("#font_select");

const DmSansRef = document.querySelector("#DmSans");
const GeneralSansRef = document.querySelector("#GeneralSans");
const InterRef = document.querySelector("#Inter");
const PoppinsRef = document.querySelector("#Poppins");
const SpaceGroteskRef = document.querySelector("#SpaceGrotesk");
const WorkSansRef = document.querySelector("#WorkSans");

const currentFont = localStorage.getItem("font")
  ? localStorage.getItem("font")
  : "DmSans";

function onWindowReload() {
  switch (currentFont) {
    case "DmSans":
      document.body.className = "DmSans";
      DmSansRef.setAttribute("selected", true);
      break;

    case "GeneralSans":
      document.body.className = "GeneralSans";
      GeneralSansRef.setAttribute("selected", true);
      break;

    case "Inter":
      document.body.className = "Inter";
      InterRef.setAttribute("selected", true);
      break;
    case "Poppins":
      document.body.className = "Poppins";
      PoppinsRef.setAttribute("selected", true);
      break;
    case "SpaceGrotesk":
      document.body.className = "SpaceGrotesk";
      SpaceGroteskRef.setAttribute("selected", true);
      break;
    case "WorkSans":
      document.body.className = "WorkSans";
      WorkSansRef.setAttribute("selected", true);
      break;
    default:
      break;
  }
}

onWindowReload();

selectRef.addEventListener("change", () => {
  switch (selectRef.value) {
    case "DmSans":
      localStorage.setItem("font", selectRef.value);
      document.body.className = "DmSans";
      break;
    case "GeneralSans":
      localStorage.setItem("font", selectRef.value);
      document.body.className = "GeneralSans";
      break;

    case "Inter":
      localStorage.setItem("font", selectRef.value);
      document.body.className = "Inter";
      break;
    case "Poppins":
      localStorage.setItem("font", selectRef.value);
      document.body.className = "Poppins";
      break;
    case "SpaceGrotesk":
      localStorage.setItem("font", selectRef.value);
      document.body.className = "SpaceGrotesk";
      break;
    case "WorkSans":
      localStorage.setItem("font", selectRef.value);
      document.body.className = "WorkSans";
      break;
    default:
      onWindowReload();
      break;
  }
});
