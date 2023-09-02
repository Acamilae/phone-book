import { useState } from "react";
import user from "./assets/usernew.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [newContact, setnewContact] = useState([]);
  const [searchContact, setSearchContact] = useState("");

  const addNewContactToPhoneBook = (contact) => {
    setnewContact(
      [...newContact, contact].sort((a, b) =>
        a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1
      )
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100" id="addContact">
        <img src={user} alt="" className="imguser"/>
        <h1 className="text-3x1 font-sembold text-center ">Phone Book</h1>
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
          <NewContactForm addNewContactToPhoneBook={addNewContactToPhoneBook} />
          <ShowContacts newContact={newContact} searchContact={searchContact}setSearchContact={setSearchContact} />
        </div>
      </div>
    </>
  );
}

function NewContactForm({ addNewContactToPhoneBook }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    addNewContactToPhoneBook({ firstName, lastName, phoneNumber});


    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
      />
      <br />
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
      />
      <br />
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
      />
      <br />
      <button type="submit" className="w-full bg-blye-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">CREATE</button>
    </form>
  );
}

function ShowContacts({ newContact, searchContact, setSearchContact }) {
  const filteredContacts = newContact.filter((contact) => {
    const firsNameMatch = contact.firstName
      .toLowerCase()
      .includes(searchContact?.toLowerCase() || "");

    const lastNameMatch = contact.lastName
      .toLowerCase()
      .includes(searchContact?.toLowerCase() || "");

    const phoneNumberMatch = contact.phoneNumber.includes(searchContact || "");

    return firsNameMatch || lastNameMatch || phoneNumberMatch;

    
  });
  return (
    <div className="show">
      <input
        className="w-full px-3 py-2 border rounded-lg"
        type="text"
        value={searchContact}
        placeholder="Find Someone"
        onChange={(event) => setSearchContact(event.target.value)}
      />

      <table className="inp-find w-full mt-4">
        <thead>
          <tr>
            <th className="py-3">First Name</th>
            <th className="py-3">Last Name</th>
            <th className="py-3">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.firstName} className="hover:bg-gray-100">
              <td>{contact.firstName} </td>
              <td>{contact.lastName} </td>
              <td>{contact.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
