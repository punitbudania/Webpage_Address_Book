// let contactList;
// window.addEventListener('DOMContentLoaded', (Event) =>{
//     contactList = getContactDataFromStorage();
//     document.querySelector('.person-count').textContent = contactList.length;
//     createInnerHtml();
//     localStorage.removeItem('editContact');
// });

// const getContactDataFromStorage = () => {
//     return localStorage.getItem('ContactList') ? JSON.parse(localStorage.getItem('ContactList')) : [];
// }

// const createInnerHtml = () => {
//     if (contactList.length == 0) return;
//     const headerHtml = `<th>FullName</th>
//                         <th>Address</th>
//                         <th>city</th>
//                         <th>State</th>
//                         <th>Zip Code</th>
//                         <th>Phone Number</th> 
//                         <th></th>`;
//     let innerHtml = `${headerHtml}`;
//     for (const contactData of contactList)
//     {
//         innerHtml = `${innerHtml}
//         <tr>
//             <td><img src="${contactData._profilePic}" alt="2" class="profile"></td>
//             <td>${contactData._name}</td>
//             <td>${contactData._gender}</td>
//             <td>${contactData._salary}</td>
//             <td>${contactData._startDate}</td>
//             <td>
//                 <img id="${contactData._id}" onclick="remove(this)" src="../assets/delete-black-18dp.svg" alt="delete">
//                 <img id="${contactData._id}" onclick="update(this)" src="../assets/create-black-18dp.svg" alt="edit">
//             </td>
//         </tr>`;
//     }
//     document.querySelector('#table-display').innerHTML = innerHtml;
// }

// const remove = (node) => {
//     let contactData = contactList.find(conData => conData._id == node.id);
//     if (!contactData) return;
//     const index = contactList
//                     .map(conData => conData._id)
//                     .indexOf(contactData._id);
//     contactList.splice(index, 1);
//     localStorage.setItem("ContactList", JSON.stringify(contactList));
//     document.querySelector(".person-count").textContent = contactList.length;
//     createInnerHtml();
// }


let addressBook;
window.addEventListener('DOMContentLoaded', (event) => {
  addressBook = getContactsFromJSONArray();
  document.querySelector(".person-count").textContent = addressBook.length;
  createInnerHTML();
});

const createInnerHTML = () => {
  const headerHtml = `
    <th>Fullname</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zip</th>
        <th>Phonenumber</th>
        <th>Email</th>
        <th></th>`;
  let innerHtml = `${headerHtml}`;
  if (addressBook.length != 0) {
    for (const contact of addressBook) {
      innerHtml = `${innerHtml}
      <tr>
        <td>${contact._name}</td>
        <td>${contact._address}</td>
        <td>${contact._city}</td>
        <td>${contact._state}</td>
        <td>${contact._zip}</td>
        <td>${contact._phoneNumber}</td>
        <td>${contact._email}</td>
        <td>
          <img id="${contact._id}" onclick="remove(this)" alt="delete" 
                    src="../assets/delete-black-18dp.svg">
          <img id="${contact._id}" onclick="update(this)" alt="edit" 
                    src="../assets/create-black-18dp.svg">
        </td>
      </tr>`;
    }
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
};

const getContactsFromJSONArray = () => {
  let contacts = [
    {
      _id: 1,
      _name: "Vaishali Sharma",
      _address: "Santa Cruz",
      _city: "Mumbai",
      _state: "Maharashtra",
      _zip: 200134,
      _phoneNumber: "+91 9089671234",
      _email: "vaishali.sharma@gmail.com"
    },
    {
      _id: 2,
      _name: "Vishal Gupta",
      _address: "Malta Road",
      _city: "Jaipur",
      _state: "Rajasthan",
      _zip: 300134,
      _phoneNumber: "+91 9089671232",
      _email: "vishal.gupta@gmail.com"
    }
  ]
  return contacts;
}