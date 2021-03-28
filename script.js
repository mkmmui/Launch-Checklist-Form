window.addEventListener("load", () => {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let missionTarget = document.getElementById("missionTarget");
         let index = Math.floor(Math.random()*json.length);
         missionTarget.innerHTML = 
         `<h2>Mission Destination</h2>
         <ol>
         <li>Name: ${json[index].name}</li>
         <li>Diameter: ${json[index].diameter}</li>
         <li>Star: ${json[index].star}</li>
         <li>Distance: ${json[index].distance}</li>
         <li>Moon(s): ${json[index].moons}</li>
         </ol>
         <img src="${json[index].image}">`
      });
   });

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required.")
      } else if (!isNaN(pilotName.value) || !isNaN(copilotName.value) || isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
         alert("Names must only contain letters, Fuel Level and Cargo Mass must be numerical values.")
      } else {
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is Ready`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is Ready`;

         if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
            faultyItems.style.visibility = "visible";
            fuelStatus.innerHTML = "There is not enough fuel for the journey";
            cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle not ready for launch"
         } else if (fuelLevel.value >= 10000 && cargoMass.value > 10000) {
            faultyItems.style.visibility = "visible";
            cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle not ready for launch"
         } else if (fuelLevel.value < 10000 && cargoMass.value <= 10000) {
            faultyItems.style.visibility = "visible";
            fuelStatus.innerHTML = "There is not enough fuel for the journey";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle not ready for launch"
         } else {
            faultyItems.style.visibility = "visible";
            launchStatus.style.color = "green";
            launchStatus.innerHTML = "Shuttle is ready for launch"
         }
      }
   })
})