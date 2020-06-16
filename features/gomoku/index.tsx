import React from 'react';

import Board from './Board';
import { Mark } from './types';


export default function Gomoku() {

  return (
    <Board
      currentTurnMark={Mark.x}
      userMark={Mark.x}
      xMoves={[]}
      oMoves={[]}
      move={(coor) => {}}
      quit={() => {}}
      score={{
        [Mark.o]: 0,
        [Mark.x]: 0
      }}
    />
  );
}