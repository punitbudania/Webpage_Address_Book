const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(!nameRegex.test(name)) throw 'Incorrect Name';
}

const checkAddress = (address) => {
    let addressRegex = RegExp('^[A-Za-z0-9,\\.]{3,}([\\s][A-Za-z0-9,\\.]{3,}){0,}$');
    if(!addressRegex.test(address)) throw 'Incorrect Address';
}

const checkMobile = (mobile) => {
    let mobileRegex = RegExp('^(([+])?[0-9]{2}[\\s])?[1-9]{1}[0-9]{9}$');
    if(!mobileRegex.test(mobile)) throw 'Incorrect Phone No.';
}