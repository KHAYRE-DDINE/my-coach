import { useEffect, useState } from "react";
import "./Details.css";
import "../ListItemsPage/ListItemsPage.css";
import footerImage from "../../images/footer-img.png";
// import characters from "../../images/characters.jpeg";
// import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Character {
  id: number,
  name: string,
  gender: string,
  status: string,
  species: string,
  image: string
}

interface CharacterInfo {
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
}

function Details(): JSX.Element {
  const [listItem, setListItem] = useState<Character[] | undefined>();
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo>({
    name: "",
    gender: "",
    status: "",
    species: "",
    image: "",
  });
  // const location = useLocation()
  const { id } = useParams<{ id: string }>(); // Type the param object

  useEffect(() => {
    const getItems = async () => {
      await axios
        .get("https://rickandmortyapi.com/api/character")
        .then((character) => setListItem(character.data.results));
    };
    getItems();
    console.log("above")

  }, []);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const foundItem = () => {
    if (!listItem || !id) return; // Early return if data not loaded or id missing
    let foundIt = listItem.filter((character) => character.id === parseInt(id));

    if (foundIt.length > 0) {
      setCharacterInfo({ ...foundIt[0] }); // Use spread operator for all properties
    }
  };

  useEffect(() => {
    foundItem();
    console.log("details")
  }, [])

  return (
    <div className="details App head">
      <div className="top">
        <img src={footerImage} alt="rick et morty" />
      </div>
      <div className="all-info">
        <h1>Discover the Secrets of Rick Sanchez from the Rick and Morty Universe! </h1>
        <div className="boxe">
          <div className="image">
            <img src={characterInfo.image} alt="characters" />
          </div>
          <div className="info">
            <img src={footerImage} alt="characters" />
            <ul>
              <li>Status: {characterInfo.status}</li>
              <li>Species: {characterInfo.species}</li>
              <li>Gender: {characterInfo.gender} </li>
            </ul>
            <p>
              <b> {characterInfo.name}</b> is a{" "}
              <b>
                {characterInfo.gender} {characterInfo.species}{" "}
              </b>
              who is currently
              <b> {characterInfo.status}</b>. He remains a core figure in the{" "}
              <b> {characterInfo.species} </b>
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
