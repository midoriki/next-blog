import React, { useState } from 'react';
import cn from 'classnames';

import { Coordinator, Mark } from './types';
import styles from './Piece.module.scss';


interface PieceProps {
  occupyingMark?: Mark,
  move: (coordinator: Coordinator) => void
  coordinator: Coordinator,
  userMark: Mark,
  currentTurnMark: Mark
}

export default function Piece(props: PieceProps) {
  const {
    occupyingMark = Mark.EMPTY,
    userMark,
    currentTurnMark
  } = props;

  const isUserTurn = userMark === currentTurnMark;

  const [hoverMark, setHoverMark] = useState(Mark.EMPTY);

  const isOccupied = occupyingMark !== Mark.EMPTY;

  function handleClick(event: React.MouseEvent) {
    if (isOccupied || !isUserTurn) {
      return;
    }

    props.move(props.coordinator);
  } 

  function handleMouseOver(event: React.MouseEvent) {
    if (isOccupied || !isUserTurn) {
      return;
    }
    
    setHoverMark(userMark);
  }

  function handleMouseOut(even: React.MouseEvent) {
    setHoverMark(Mark.EMPTY);
  }

  const hoverClass = hoverMark !== Mark.EMPTY ? styles.hover : '';

  const className = cn(styles.piece, styles[occupyingMark], hoverClass);

  return (
    <td
      onClick={handleClick}
      className={className}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {occupyingMark}
      {hoverMark}
    </td>
  );
}