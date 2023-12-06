import { Form, InputGroup } from "react-bootstrap";

const SearchComponent = ({searchValue, setSearchValue}) => {

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
      <Form.Control
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon1"
        onChange={(e) => setSearchValue(e.target.value.trim())}
        value={searchValue}
      />
    </InputGroup>
  );
};

export default SearchComponent;
