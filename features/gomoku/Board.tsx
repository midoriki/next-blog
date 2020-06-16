import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

import { Coordinator, Mark } from './types';
import Piece from './Piece';
import styles from './Board.module.scss';


const BOARD_ROW = 40;
const BOARD_COL = 40;

const CONTAINER_ID = "container";
const BOARD_ID = "gomoku";

interface Score {
  [Mark.x]: number,
  [Mark.o]: number
}

interface BoardProps {
  userMark: Mark,
  currentTurnMark: Mark,
  xMoves: Coordinator[],
  oMoves: Coordinator[],
  move: (coordinator: Coordinator) => void,
  quit: () => void,
  score: Score
}

export default function Board(props: BoardProps) {
  const {
    userMark,
    currentTurnMark,
    xMoves,
    oMoves
  } = props;
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      // TODO: scroll to center of the screen

      firstLoad.current = false;
    }
  });

  const isUserTurn = userMark === currentTurnMark;

  function move(coordinator: Coordinator) {
    if (isUserTurn) {
      props.move(coordinator);
    }
  }

  function pieceOccupiedBy(coordinator: Coordinator): Mark {
    const  isXOccupied = xMoves.some(
      m => m.x === coordinator.x && m.y === coordinator.y
    );

    if (isXOccupied) {
      return Mark.x;
    }

    const isOOccupied = oMoves.some(
      m => m.x === coordinator.x && m.y === coordinator.y
    );

    if (isOOccupied) {
      return Mark.o;
    }

    return Mark.EMPTY;
  }

  function drawBoard() {
    const rowNumber = BOARD_ROW;
    const colNumber = BOARD_COL;

    let grid = [];

    for (let i = 0; i < rowNumber; i++) {
      let children = [];

      for (let j = 0; j < colNumber; j++) {
        const coordinator = {
          x: i,
          y: j
        };

        children.push(
          <Piece
            key={`${i}${j}`} 
            coordinator={coordinator}
            move={move}
            userMark={userMark}
            currentTurnMark={currentTurnMark}
            occupyingMark={pieceOccupiedBy(coordinator)}
          />
        );
      }

      grid.push(<tr key={i}>{children}</tr>);
    }

    return (
      <table id={BOARD_ID} className={styles.gomoku}>
        <tbody>
          {grid}
        </tbody>
      </table>
    );
  }

  return (
    <div id={CONTAINER_ID} className={styles.container}>
      {drawBoard()}
    </div>
  );
}