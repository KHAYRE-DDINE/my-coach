import React from "react";
import "./Details.css";
import "../ListItemsPage/ListItemsPage.css";
import footerImage from "../../images/footer-img.png";
import characters from "../../images/characters.jpeg";

function Details() {
  return (
    <div className="details App head">
      <div className="top">
        <img src={footerImage} alt="rick et morty" />
      </div>
      <div className="all-info">
        <h1>
          Discover the Secrets of Rick Sanchez from the Rick and Morty
          Universe!" 🧬🚀
        </h1>

        <div className="boxe">
          <div className="image">
            <img src={characters} alt="characters" />
          </div>
          <div className="info">
            <img src={footerImage} alt="characters" />

            <ul>
              <li>Status: Alive</li>
              <li>Species: Human</li>
              <li>Gender: Male</li>
            </ul>

            <p>
              <b> Rick Sanchez</b> is a Male <b> Human </b>who is currently
              <b> Alive</b>. He remains a core figure in the <b> human </b>
              species.
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="image">
          <img src={footerImage} alt="rick et morty" />
        </div>
      </footer>
    </div>
  );
}

export default Details;
