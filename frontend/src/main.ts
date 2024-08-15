console.log("Start main.ts");

const fileInput = document.getElementById("file-input") as HTMLInputElement;
const uploadButton = document.getElementById("upload-button") as HTMLButtonElement;

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;

  // Send formdata to the server
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await fetch("http://localhost:8000", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    console.log("Response.json", json);
  } catch (error) {
    console.error("Error", error);
  }
});
