import React from "react";
import { useEffect, useState } from "react";
import "./ListItemsPage.css";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import footerImage from "../../images/footer-img.png";
import characters from "../../images/characters.jpeg";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function ListItemsPage() {
  const [listItem, setListItem] = useState();
  const [newListItems, setNewListItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [characterPerPage, setCharacterPerPage] = useState(9);
  const navigate = useNavigate();
  // const numberOfPagination = Math.ceil(listItem.length / characterPerPage)

  useEffect(() => {
    const getItems = async () => {
      await axios
        .get("https://rickandmortyapi.com/api/character")
        .then(
          (character) => (
            setListItem(character.data.results),
            setNewListItems(character.data.results)
          )
        );
    };
    getItems();
  }, []);

  const searchItems = (e) => {
    let newList = listItem.filter((l) =>
      l.name.toLowerCase().includes(e.target.value)
    );
    setNewListItems(newList);
  };

  const FilterByGender = (e) => {
    let newList = listItem.filter(
      (l) => l.gender.toLowerCase() === e.target.value.toLowerCase()
    );
    setNewListItems(newList);
  };

  const FilterBySpecies = (e) => {
    let newList = listItem.filter(
      (l) => l.species.toLowerCase() === e.target.value.toLowerCase()
    );
    setNewListItems(newList);
  };

  const FilterByStatus = (e) => {
    let newList = listItem.filter(
      (l) => l.status.toLowerCase() === e.target.value.toLowerCase()
    );
    setNewListItems(newList);
  };
  const handlePaginationClick = (e) => {
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
        pageCount={3}
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
