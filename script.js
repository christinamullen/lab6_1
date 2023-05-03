const houses = [{
    code: "ST",
    name: "Stark",
    bkcolor: "D5CEB2",
    tcolor: "80808"
  },
  {
    code: "LA",
    name: "Lannister",
    bkcolor: "86090A",
    tcolor: "c1ac79"
  },
  {
    code: "BA",
    name: "Baratheon",
    bkcolor: "F0C403",
    tcolor: "212121"
  },
  {
    code: "TA",
    name: "Targaryen",
    bkcolor: "212121",
    tcolor: "C21920"
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
  var r = document.querySelector(':root');
  var rs = getComputedStyle(r);
  
  // loop through array and create an option tag
  //with the data from the objects
  houses.forEach(house  => {
    let myoption = document.createElement('OPTION');
    myoption.value = house.code;
    let name = house.name;
    myoption.innerHTML = name;
    dropdown.append(myoption);
  });
  
  //query the api
  const fetchColor = async (hexCode) => {
    try {
      const response = await fetch(`https://www.colr.org/json/color/${hexCode}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching color from API: ", error);
    }
  };

  //func to respond to the change oc house code from dropdown
  dropdown.addEventListener('change', async (e) => {
    console.log(e.target.value);
    const myCode = e.target.value;
    const myChars = getCharacters(myCode);
    console.log(myChars);
    let list_item = document.getElementById('characters');
    list_item.innerHTML = '';
    
    //set the background color, and text color of the selected field
    const selectedHouse = houses.find((house) => house.code === myCode);
    if (selectedHouse) {
      const bkColorData = await fetchColor(selectedHouse.bkcolor);
      const txtColorData = await fetchColor(selectedHouse.tcolor);
      console.log(bkColorData.new_color);
      r.style.setProperty('--bk-start', '#' + bkColorData.new_color); //use || for default if no response?
      r.style.setProperty('--tc-start', '#' + txtColorData.new_color);
    } else {
      r.style.setProperty('--bk-start', rs.getPropertyValue('--bk-start'));
      r.style.setProperty('--tc-start', rs.getPropertyValue('--tc-start'));
    }
    
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
