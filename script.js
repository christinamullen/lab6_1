const houses = [{
    code: "ST",
    name: "Stark"
  },
  {
    code: "LA",
    name: "Lannister"
  },
  {
    code: "BA",
    name: "Baratheon"
  },
  {
    code: "TA",
    name: "Targaryen"
  }
];

// Return an array of characters belonging to a house
const getCharacters = houseCode => {
  switch (houseCode) {
    case "ST":
      return ["Eddard", "Catelyn", "Robb", "Sansa", "Arya", "Jon Snow"];
    case "LA":
      return ["Tywin", "Cersei", "Jaime", "Tyrion"];
    case "BA":
      return ["Robert", "Stannis", "Renly"];
    case "TA":
      return ["Aerys", "Daenerys", "Viserys"];
    default:
      return []; // Empty array
  }
};


document.addEventListener('DOMContentLoaded', init);

function init() {
  let dropdown = document.getElementById('house');
  
  // loop through array and create an option tag
  //with the data from the objects
  houses.forEach(house  => {
    let myoption = document.createElement('OPTION');
    myoption.value = house.code;
    let name = house.name;
    myoption.innerHTML = name;
    dropdown.append(myoption);
  });
  //func to respond to the change oc house code from dropdown
  dropdown.addEventListener('change', (e) => {
    console.log(e.target.value);
    const myCode = e.target.value;
    const myChars = getCharacters(myCode);
    console.log(myChars);
    let list_item = document.getElementById('characters');
    list_item.innerHTML = '';
    
    myChars.forEach((mychar) => {
      let dt = document.createElement('DT');
      dt.className = "character-name";
      dt.innerText = mychar;

      let dd = document.createElement('DD');
      dd.className = "character-description";
      dd.innerText = `A member of House ${houses.find(house => house.code === myCode).name}`;

      list_item.append(dt);
      list_item.append(dd);
      
    });
     
  });
}
