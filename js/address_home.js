let contactList;
window.addEventListener('DOMContentLoaded', (Event) =>{
    contactList = getContactDataFromStorage();
    document.querySelector('.person-count').textContent = contactList.length;
    createInnerHtml();
    //localStorage.removeItem('editContact');
});

const getContactDataFromStorage = () => {
    return localStorage.getItem('ContactList') ? JSON.parse(localStorage.getItem('ContactList')) : [];
}

const createInnerHtml = () => {
    if (contactList.length == 0) return;
    const headerHtml = `<th>FullName</th>
                        <th>Address</th>
                        <th>city</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Phone Number</th> 
                        <th></th>`;
    let innerHtml = `${headerHtml}`;
    for (const contactData of contactList)
    {
        innerHtml = `${innerHtml}
        <tr>
            <td>${contactData._name}</td>
            <td>${contactData._address}</td>
            <td>${contactData._city}</td>
            <td>${contactData._state}</td>
            <td>${contactData._zip}</td>
            <td>${contactData._mobile}</td>
            <td>
                <img id="${contactData._id}" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
                <img id="${contactData._id}" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
            </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let contactData = contactList.find(conData => conData._id == node.id);
    if (!contactData) return;
    const index = contactList
                    .map(conData => conData._id)
                    .indexOf(contactData._id);
    contactList.splice(index, 1);
    localStorage.setItem("ContactList", JSON.stringify(contactList));
    //document.querySelector(".person-count").textContent = contactList.length;
    createInnerHtml();
}

const update = (node) => {
    let contactData = contactList.find(conData => conData._id == node.id);
    if(!contactData) return;
    localStorage.setItem('editContact', JSON.stringify(contactData));
    window.location.replace(site_properties.form_page);
}