import React, { useState } from "react";

function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
    setIsOpen(false);
  };

  return (
    <div>
      <button className="popup-button" onClick={() => setIsOpen(true)}>
        Open Popup
      </button>
      {isOpen && (
        <div className="popup-container">
          <form className="popup-form" onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                className="popup-input"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                className="popup-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <br />
            <button className="popup-submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Popup;
