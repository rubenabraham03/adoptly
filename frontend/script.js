const loadButton = document.getElementById("loadPets");
const tableBody = document.getElementById("petsBody");
const statusText = document.getElementById("status");

// Backend and frontend are on the same origin in this setup.
// No hardcoded port needed, just use a relative path.
const API_URL = "/api/pets";

loadButton.addEventListener("click", async () => {
  statusText.textContent = "Loading pets...";
  tableBody.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("Server returned " + res.status);
    }

    const pets = await res.json();

    if (pets.length === 0) {
      statusText.textContent = "No available pets found.";
      return;
    }

    pets.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.PetID}</td>
        <td>${p.Name}</td>
        <td>${p.Species}</td>
        <td>${p.Breed}</td>
        <td>${p.Age}</td>
        <td>${p.Size}</td>
        <td>${p.AdoptionStatus}</td>
        <td>${p.ShelterName}</td>
      `;
      tableBody.appendChild(row);
    });

    statusText.textContent = `Loaded ${pets.length} pets.`;
  } catch (err) {
    console.error(err);
    statusText.textContent = "Failed to load pets. Check backend and database.";
  }
});
