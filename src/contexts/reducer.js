/* eslint-disable default-case */
import { spaceshipsTypes } from '../gameAssets/functional/Sprites/spaceship/spaceshipsTypes.js';
import * as types from './types.js';

export const gameReducer = (state, action) => {
  switch (action.type) {
    case types.CHANGE_SPACESHIP: {
      let spaceShipId = action.payload;

      if (spaceShipId > state.spaceShipId && !spaceshipsTypes[spaceShipId]) {
        spaceShipId = 0
      } else if (!spaceshipsTypes[spaceShipId]) spaceShipId = spaceshipsTypes.length - 1

      return { ...state, spaceShipId };
    }

    case types.GAME_OVER: {
      return { ...state, gameOver: true, points: action.payload ?? 0 };
    }

    case types.RANK_INPUT: {
      const rankData = action.payload;

      const ranks = state.ranks;
      ranks.push(rankData);

      return {
        ...state,
        ranks,
        points: 0,
        health: 100,
        level: 0,
        gameOver: false,
        initial: true,
        paused: true,
        showRank: true,
      }
    }

    case types.RANK_MENU_OPEN: {
      return {
        ...state,
        showRank: true
      }
    }

    case types.RANK_MENU_CLOSE: {
      return {
        ...state,
        showRank: false
      }
    }

    case types.RESTART: {
      return {
        ...state,
        points: 0,
        health: 100,
        level: 0,
        gameOver: false,
        initial: true,
        paused: true,
      }
    }

    case types.LOSE_LIFE: {
      const updatedHealth = state.health - (action.payload || 1);

      return {
        ...state,
        health: updatedHealth,
      }
    }

    case types.LEVEL_UP: {
      let { level } = state;
      level++;

      return { ...state, level };
    }

    case types.PAUSE: {
      return { ...state, paused: !state.paused };
    }

    case types.TOUCH_MODE: {
      return { ...state, touchScreen: true };
    }

    case types.INITIAL: {
      return { ...state, initial: true, paused: true }
    }

    case types.ON: {
      return { ...state, initial: false, paused: false }
    }

    case types.TUTORIAL_DISPLAY: {
      return { ...state, showTutorial: true, paused:true }
    }

    case types.DISABLE_JOYSTYCK: {
      return { ...state, touchScreen: false }
    }

    case types.CLOSE_TUTORIAL: {
      return { ...state, showTutorial: false }
    }

    case types.CHANGE_JOYSTYCK: {
      if (!action?.payload?.size || action?.payload?.size < 20 || action?.payload?.size > 400) return state;
      return { ...state, joystickSize: action?.payload?.size }
    }

    default: {
      console.log({ ...action });
    }
  }
}
