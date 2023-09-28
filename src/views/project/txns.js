import React, { useState } from "react";
import { Row, Col, Card, Table, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const Stocks = () => {
  const { GetStock } = useFetch();
  const { data: Stock } = GetStock();
  const [search, setSearch] = useState('');

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Search  by Name" aria-label="search" aria-describedby="basic-addon1"  onChange={(e) => setSearch(e.target.value)} />
              </InputGroup>
              <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export Data to Excel Sheet"/>
            </Card.Header>
            <Card.Body>
              <Table responsive hover id="table-to-xls">
                <thead>
                  <tr>
                    <th>IMG</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>PRICE</th>
                    <th>UNIT</th>
                    <th>CATERGORY</th>
                    <th>SKU</th>
                    <th>CREATED AT</th>
                    <th>ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {Stock?.filter((Stock) => {
                return search.toLowerCase() === ''
                  ? Stock
                  : Stock.name.toLowerCase().includes(search);
              })
              .map((Stock, index) => (
                  <tr className="unread" key={index}>
                  <td><img src={Stock.image_original} className='w-100' /></td>
                  <td>
                    {Stock.name}
                  </td>
                  <td>
                    {Stock.description}
                  </td>
                  <td>{Stock.price}
                  </td>
                  <td>{Stock.unit}
                  </td>
                  <td><Link to="#" className="label theme-bg text-white f-12">
                      {Stock.category}
                      </Link>
                  </td>
                  <td>
                    {Stock.sku} </td>
                  <td>
                    {Stock.created_at} </td>
                  <td>
                    {Stock.id} 
                    </td>
                    <td>
                      <Link to={`/orderdetails?id=${Stock._id}`} className="label theme-bg2 text-white f-12">
                      EDIT
                      </Link>
                      <Link to={`/stock/delete?id=${Stock._id}`} className="label theme-bg2 text-white f-12">
                      DELETE
                      </Link>
                      </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Stocks;
