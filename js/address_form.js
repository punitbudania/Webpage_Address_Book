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
})