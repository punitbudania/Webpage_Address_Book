let isUpdate = false;
let contactObject = {};
let contactObj = {};

window.addEventListener('DOMContentLoaded', (Event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0)
        {
            textError.textContent = "";
            //setTextValue('.text-error', "");
            return;
        }

        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if (nameRegex.test(name.value))
        {
            textError.textContent = "";
        } 
        else textError.textContent = "Invalid Name!";
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        if(address.value.length == 0)
        {
            addressError.textContent = "";
            return;
        }
        let addressRegex = RegExp('^[A-Za-z0-9,\\.]{3,}([\\s][A-Za-z0-9,\\.]{3,}){0,}$');
        if (addressRegex.test(address.value)) 
        {
            addressError.textContent = "";
        } 
        else addressError.textContent = "Invalid Address!";
    });

    const mobile = document.querySelector('#mobile');
    const mobileError = document.querySelector('.mobile-error');
    mobile.addEventListener('input', function() {
        if(mobile.value.length == 0)
        {
            mobileError.textContent = "";
            return;
        }
        let mobileRegex = RegExp('^(([+])?[0-9]{2}[\\s])?[1-9]{1}[0-9]{9}$');
        if (mobileRegex.test(mobile.value)) 
        {
            mobileError.textContent = "";
        } 
        else mobileError.textContent = "Invalid Phone Number!";
    });

    checkForUpdate();
});

const save = (Event) => {
    try 
    {
        setContactJsonObject();
        createOrUpdateContact();
        resetForm();
        localStorage.removeItem('editContact');
        window.location.replace("../pages/address_home.html");
    } 
    catch (error) 
    {
        alert(error);
        return;
    }
};

const setContactJsonObject = () => {
    if(isUpdate) contactObject._id = contactObj._id;
    else contactObject._id = createNewContactID();
    contactObject._name = getInputValueById('#name');
    contactObject._address = getInputValueById('#address');
    contactObject._city = getInputValueById('#city');
    contactObject._state = getInputValueById('#state');
    contactObject._zip = getInputValueById('#zip');
    contactObject._mobile = getInputValueById('#mobile');
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const createOrUpdateContact = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));

    if(contactList)
    {
        let contactData = contactList.find(contact => contact._id == contactObject._id);
        if(!contactData) { contactList.push(contactObject); }
        else
        {
            const index = contactList
                            .map(contact => contact._id)
                            .indexOf(contactData._id);
            contactList.splice(index, 1, createContact(contactData._id));
        }    
    }
    else
    {
        contactList = [contactObject];
    }
    alert(contactList.toString());
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}

const createContact = (id) => {
    let contact = new Contacts();
    if (!id) contact.id = createNewContactID();
    else contact.id = id;
    setContactData(contact);
    return contact;
}

const setContactData = (contact) => {
    try {
      contact.name = contactObject._name;
    } catch (error) {
      setTextValue('.name-error', error);
      throw error;
    }
  
    try {
      contact.address = contactObject._address;
    } catch (error) {
      setTextValue('.address-error', error);
      throw error;
    }
  
    contact.city = contactObject._city;
    contact.state = contactObject._state;
    contact.zip = contactObject._zip;

    try {
      contact.mobile = contactObject._mobile;
    } catch (error) {
      setTextValue('.mobile-error', error);
      throw error;
    }
}

const createNewContactID = () => {
    let contactID = localStorage.getItem("ContactID");
    contactID = !contactID ? (1).toString() : (parseInt(contactID) + 1).toString();
    localStorage.setItem("ContactID", contactID);
    return contactID;
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#mobile', '');
    setValue('#address', '');
    setSelectedIndex('#city', 0);
    setSelectedIndex('#state', 0);
    setValue('#zip', '');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const checkForUpdate = () => {
    const contactJson = localStorage.getItem('editContact');
    isUpdate = contactJson ? true : false;
    if (!isUpdate) return;
    contactObj = JSON.parse(contactJson);
    setForm();
}

const setForm = () => {
    setValue('#name', contactObj._name);
    setValue('#mobile', contactObj._mobile);
    setValue('#address', contactObj._address);
    setValue('#city', contactObj._city);
    setValue('#state', contactObj._state);
    setValue('#zip', contactObj._zip);
}