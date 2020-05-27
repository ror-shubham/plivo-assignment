import React from "react";
import styled, {css} from "styled-components";

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const Container = styled.div`
    display: grid;
    background: white;
    width: 150px;
    height: 150px;
    grid-gap: 0;
    ${props =>
  css`
      grid-template-columns: repeat(${props.squareSide}, auto);
      grid-template-rows: repeat(${props.squareSide}, auto);
    `};
  `;

function BirthdayCard({day, names}) {
  const squareSide = names ? Math.ceil(Math.sqrt(names.length)): 1;
  return(
    <div>
      <div className='birthday_card'>
        <div className='birthday_header'>{day}</div>
        <Container squareSide={squareSide}>
          {names && names.map((name, key) => (
            <div className="grid_child" style={{background: colorArray[key]}} key={key}>
              {name.split(" ").length >= 2 ? `${name.split(" ")[0][0].toUpperCase()}${name.split(" ")[1][0].toUpperCase()}` : `${name[0].toUpperCase()}`}
            </div>
          ))}
          {
            !names && (
              <div className="grid_child" style={{background: '#444444'}}/>
            )
          }
        </Container>
      </div>
      <div>
        {names && names.length ? `${names.length} Birthday${names.length > 1 ? 's' : ''}`: 'No Birthdays'}
      </div>
    </div>
  )
}

export default BirthdayCard
