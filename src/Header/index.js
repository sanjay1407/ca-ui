import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  const HandleEnterKeyPress = e => {
    if (e.keyCode === 13) {
      history.push(`/compare?term=${searchTerm}`);
      setSearchTerm("");
    }
  };
  let history = useHistory();
  const goToHome = () => {
    history.push("/");
  };

  return (
    <div className="header" onClick={goToHome}>
      <div className="logo">FaCIS</div>

      <div className="input-box-wrapper">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search"
          onChange={handleChange}
          onKeyDown={HandleEnterKeyPress}
        />
        <i class="material-icons search-icon" onClick={HandleEnterKeyPress}>
          search
        </i>
      </div>
    </div>
  );
};

export default Header;
