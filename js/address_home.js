let contactList;
window.addEventListener('DOMContentLoaded', (Event) =>{
    if(site_properties.use_local_storage.match("true"))
    {
        getContactDataFromStorage();
    }
    else getContactDataFromServer();
});

const getContactDataFromStorage = () => {
    contactList = localStorage.getItem('ContactList') ? JSON.parse(localStorage.getItem('ContactList')) : [];
    processContactDataResponse();
}

const processContactDataResponse = () => {
    document.querySelector('.person-count').textContent = contactList.length;
    createInnerHtml();
    //localStorage.removeItem('editContact');
}

const getContactDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, false)
        .then(responseText => {
            contactList = JSON.parse(responseText);
            processContactDataResponse();
        })
        .catch(error => {
            console.log("GET error status" + JSON.stringify(error));
            contactList = [];
            processContactDataResponse();
        });
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
                <img id="${contactData.id}" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
                <img id="${contactData.id}" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
            </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let contactData = contactList.find(conData => conData.id == node.id);
    if (!contactData) return;
    const index = contactList
                    .map(conData => conData.id)
                    .indexOf(contactData.id);
    contactList.splice(index, 1);
    if(site_properties.use_local_storage.match("true"))
    {
        localStorage.setItem("ContactList", JSON.stringify(contactList));
        //document.querySelector(".person-count").textContent = contactList.length;
        createInnerHtml();
    }
    else
    {
        const deleteURL = site_properties.server_url + contactData.id.toString();
        makeServiceCall("DELETE", deleteURL, false)
            .then(responseText => {
                document.querySelector(".person-count").textContent = contactList.length;
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE error status: " + JSON.stringify(error));
            });
    }
}

const update = (node) => {
    let contactData = contactList.find(conData => conData.id == node.id);
    if(!contactData) return;
    localStorage.setItem('editContact', JSON.stringify(contactData));
    window.location.replace(site_properties.form_page);
}