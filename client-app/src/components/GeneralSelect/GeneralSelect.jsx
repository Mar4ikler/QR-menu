import { Form } from "react-bootstrap";

const GeneralSelect = ({orderValue ,setOrderValue }) => {
  return (
    <Form.Select value={orderValue} onChange={(e)=>setOrderValue(e.target.value)} aria-label="Default select example">
      <option>Default</option>
      <option value="1">Ascending prices</option>
      <option value="2">Descending prices</option>
      <option value="3">In alphabet order</option>
      <option value="4">In reverse alphabet order</option>
    </Form.Select>
  );
};

export default GeneralSelect;
