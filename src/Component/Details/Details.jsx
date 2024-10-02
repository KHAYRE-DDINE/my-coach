import React, { useEffect, useState } from "react";
import "./Details.css";
import "../ListItemsPage/ListItemsPage.css";
import footerImage from "../../images/footer-img.png";
import characters from "../../images/characters.jpeg";
import { useParams } from "react-router-dom";
import axios from "axios";

function Details() {
  const [listItem, setListItem] = useState();
  const [characterInfo, setCharacterInfo] = useState({
    name: "",
    gender: "",
    status: "",
    species: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const getItems = async () => {
      await axios
        .get("https://rickandmortyapi.com/api/character")
        .then((character) => setListItem(character.data.results));
    };
    getItems();
  }, [id]);

  const foundItem = () => {
    let foundIt = listItem?.filter(
      (character) => character.id === parseInt(id)
    );
    console.log(foundIt[0]);

    if (listItem && id) {
      setCharacterInfo({
        ...foundIt[0],
        name: foundIt[0].name,
        gender: foundIt[0].gender,
        status: foundIt[0].status,
        species: foundIt[0].species,
      });
    }
  };
  foundItem();
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
              <li>Status: {characterInfo?.status}</li>
              <li>Species: {characterInfo?.species}</li>
              <li>Gender: {characterInfo?.gender} </li>
            </ul>
            <p>
              <b> {characterInfo?.name}</b> is a{" "}
              <b>
                {characterInfo?.gender} {characterInfo?.species}{" "}
              </b>
              who is currently
              <b> {characterInfo?.status}</b>. He remains a core figure in the{" "}
              <b> {characterInfo?.species} </b>
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
