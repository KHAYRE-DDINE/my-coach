import React, { useEffect, useState } from "react";
import "./ListItemsPage.css";
import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowUp } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import footerImage from "../../images/footer-img.png";
import characters from "../../images/characters.jpeg";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;

}

function ListItemsPage(): JSX.Element {
  const [listItem, setListItem] = useState<Character[] | undefined>();
  const [newListItems, setNewListItems] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characterPerPage, setCharacterPerPage] = useState<number>(9);
  const navigate = useNavigate();
  const numberOfPagination = Math.ceil(newListItems.length / characterPerPage);

  useEffect(() => {
    const getItems = async () => {
      await axios
        .get("https://rickandmortyapi.com/api/character")
        .then((character) => (setListItem(character.data.results), setNewListItems(character.data.results)));
    };
    getItems();
  }, []);

  const searchItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newList = listItem?.filter((l) => l.name.toLowerCase().includes(e.target.value));
    setNewListItems(newList ? newList : []); // Set newList if it exists, otherwise []
  };

  const FilterByGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newList = listItem?.filter((l) => l.gender.toLowerCase() === e.target.value.toLowerCase());
    setNewListItems(newList ? newList : []);
  };

  const FilterBySpecies = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newList = listItem?.filter((l) => l.species.toLowerCase() === e.target.value.toLowerCase());
    setNewListItems(newList ? newList : []);
  };

  const FilterByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newList = listItem?.filter((l) => l.status.toLowerCase() === e.target.value.toLowerCase());
    setNewListItems(newList ? newList : []);
  };

  const handlePaginationClick = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1);
  };

  const lastIndex = currentPage * characterPerPage;
  const firstIndex = lastIndex - characterPerPage;
  const itemsPerPage = newListItems.slice(firstIndex, lastIndex);


  return (
    <div className="App">
      <header className="head">
        <div className="top">
          <img src={footerImage} alt="rick et morty" />
        </div>
        <div className="middle">
          <img src={characters} alt="characters" />
        </div>

        <div className="box">
          <p>
            "Get Schwifty with the Multiverse Madness of Rick and Morty!" 🚀🧪
          </p>
        </div>
      </header>
      <div className="controls">
        <div className="search-input">
          <input
            type="search"
            placeholder="Search ..."
            onChange={(e) => searchItems(e)}
          />
          <CiSearch />
        </div>
        <div className="filter">
          <div>
            <label>gender</label>
            <select onChange={(e) => FilterByGender(e)}>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
            <IoIosArrowDown />
          </div>
          <div>
            <label>species</label>
            <select onChange={(e) => FilterBySpecies(e)}>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
            </select>
            <IoIosArrowDown />
          </div>
          <div>
            <label>status</label>
            <select onChange={(e) => FilterByStatus(e)}>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="Unknown">Unknown</option>
            </select>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
      <div className="title">
        <h1>Meet the Wildest Characters from the Rick and Morty Multiverse!</h1>
      </div>
      <div className="listItems">
        {itemsPerPage?.map((item, index) => (
          <div key={index} className="item">
            <div className="image">
              <img src={item.image} alt={item.name} />
            </div>
            <p className="species"> {item.species}</p>
            <div className="info">
              <p className="name">name : {item.name}</p>
              <p className="gender"> gender : {item.gender}</p>
              <span className="status"> status : {item.status}</span> <br />
            </div>
            <button onClick={() => navigate(`item/${index + 1}`)}>
              <span>details</span>
            </button>
          </div>
        ))}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<MdKeyboardArrowRight />}
        previousLabel={<MdOutlineKeyboardArrowLeft />}
        pageRangeDisplayed={2}
        pageCount={numberOfPagination}
        renderOnZeroPageCount={null}
        onPageChange={(e) => handlePaginationClick(e)}
      />

      <footer className="footer">
        <div className="image">
          <img src={footerImage} alt="rick et morty" />
        </div>
      </footer>
    </div>
  );
}

export default ListItemsPage;
