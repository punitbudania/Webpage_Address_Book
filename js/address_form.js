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
        try 
        {
            checkName(name.value);
            textError.textContent = "";
            //setTextValue('.text-error', "");
        } 
        catch (error)
        {
            //setTextValue('.text-error', error);
            textError.textContent = error;    
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        if(address.value.length == 0)
        {
            addressError.textContent = "";
            return;
        }
        try 
        {
            checkAddress(address.value);
            addressError.textContent = "";
            //setTextValue('.text-error', "");
        } 
        catch (error)
        {
            //setTextValue('.text-error', error);
            addressError.textContent = error;    
        }
    });

    const mobile = document.querySelector('#mobile');
    const mobileError = document.querySelector('.mobile-error');
    mobile.addEventListener('input', function() {
        if(mobile.value.length == 0)
        {
            mobileError.textContent = "";
            return;
        }
        try 
        {
            checkMobile(mobile.value);
            mobileError.textContent = "";
            //setTextValue('.text-error', "");
        } 
        catch (error)
        {
            //setTextValue('.text-error', error);
            mobileError.textContent = error;    
        }
    });

    checkForUpdate();
});

const save = (Event) => {
    try 
    {
        setContactJsonObject();
        if(site_properties.use_local_storage.match("true"))
        {
            createOrUpdateContact();
            resetForm();
            localStorage.removeItem('editContact');
            window.location.replace("../pages/address_home.html");
        }
        else
        {
            createOrUpdateContactOnServer();
        }
    } 
    catch (error) 
    {
        alert(error);
        return;
    }
}

const createOrUpdateContactOnServer = () => {
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate)
    {
        methodCall = "PUT";
        postURL = postURL + contactObject.id.toString();
    }
    makeServiceCall(methodCall, postURL, false, contactObject)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        });
}

const setContactJsonObject = () => {
    if(site_properties.use_local_storage.match("true"))
    {
        if(isUpdate) contactObject.id = contactObj.id;
        else contactObject.id = createNewContactID();
    }
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
        let contactData = contactList.find(contact => contact.id == contactObject.id);
        if(!contactData) { contactList.push(contactObject); }
        else
        {
            const index = contactList
                            .map(contact => contact.id)
                            .indexOf(contactData.id);
            contactList.splice(index, 1, createContact(contactData.id));
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