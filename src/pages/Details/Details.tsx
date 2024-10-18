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
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
}

interface CharacterInfo {
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
}

function Details(): JSX.Element {
  const [listItem, setListItem] = useState<Character[] | undefined>({
    name: "",
    gender: "",
    status: "",
    species: "",
    image: "",
  });
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo>();
  const { id } = useParams<{ id: string }>(); // Type the param object

  useEffect(() => {
    const getItems = async () => {
      if (id) {
        await axios
          .get(`https://rickandmortyapi.com/api/character/${id}`) // Fetch by specific id
          .then((character) => setListItem(character.data));
      } else {
        // Fetch all characters if no id provided (optional)
        await axios
          .get("https://rickandmortyapi.com/api/character")
          .then((character) => setListItem(character.data.results));
      }
    };
    getItems();
  }, [id]);


  return (
    <div className="details App head">
      <div className="top">
        <img src={footerImage} alt="rick et morty" />
      </div>
      <div className="all-info">
        <h1>Discover the Secrets of Rick Sanchez from the Rick and Morty Universe! </h1>
        <div className="boxe">
          <div className="image">
            <img src={listItem?.image} alt="characters" />
          </div>
          <div className="info">
            <img src={footerImage} alt="characters" />
            <ul>
              <li>Status: {listItem?.status}</li>
              <li>Species: {listItem?.species}</li>
              <li>Gender: {listItem?.gender} </li>
            </ul>
            <p>
              <b> {listItem?.name}</b> is a{" "}
              <b>
                {listItem?.gender} {listItem?.species}{" "}
              </b>
              who is currently
              <b> {listItem?.status}</b>. He remains a core figure in the{" "}
              <b> {listItem?.species} </b>
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
