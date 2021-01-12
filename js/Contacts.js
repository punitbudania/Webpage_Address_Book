class Contacts
{
    // get id() { return this._id; }
    // set id(id) { this._id = id; }
  
    id;

    get name() { return this._name; }
    set name(name) { this._name = name; }
  
    get address() { return this._address; }
    set address(address) { this._address = address; }
  
    get city() { return this._city; }
    set city(city) { this._city = city; }
  
    get state() { return this._state; }
    set state(state) { this._state = state; }
  
    get zip() { return this._zip; }
    set zip(zip) { this._zip = zip; }
  
    get mobile() { return this._mobile; }
    set mobile(mobile) { this._mobile = mobile; }
  
    toString() {
        return  "ID = " + this._id + ", Name = " + this.name + ", Address = " + this.address + ", City = " + this.city 
                    + ", State = " + this.state + ", Zip = " + this.zip + ", Phone Number = " + this.mobile;
    }
}