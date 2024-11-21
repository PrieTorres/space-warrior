/* eslint-disable default-case */
import { isArray } from 'lodash';
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

    case types.LOADING_RANKS: {
      return { ...state, loadingRanks: true };
    }

    case types.LOAD_RANK: {
      const data = action.payload?.rank ?? [];
      const localRank = JSON.parse(window.localStorage.getItem("rank"));
      const rank = state.ranks ?? [];

      if (isArray(localRank)) {
        data.push(...localRank);
      }

      data?.forEach((rankData) => {
        const { name, points, insertedDate, id, _id } = rankData;

        if (!rank.map(r => r?.id)?.includes(_id ?? id)) {
          rank.push({ rankName: name, points, insertedDate, id: _id ?? id });
        }
      });

      return { ...state, ranks: rank, loadingRanks: false }
    }

    case types.SAVE_RANK: {
      return {
        ...state,
        loadingAddRanks: true,
        points: 0,
        health: 100,
        level: 0,
        gameOver: false,
        initial: true,
        paused: true,
        totalSeconds: 0,
        showRank: true
      }
    }

    case types.SUCESSFULL_SAVE_RANK: {
      return {
        ...state,
        loadingAddRanks: false,
      }
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
        totalSeconds: 0,
        startedTime: new Date(),
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

    case types.ADD_SECONDS: {
      let { totalSeconds = 0 } = state;
      totalSeconds++;

      return { ...state, totalSeconds };
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
      return { ...state, initial: false, paused: false, startedTime: new Date(), totalSeconds: 0 }
    }

    case types.TUTORIAL_DISPLAY: {
      return { ...state, showTutorial: true, paused: true }
    }

    case types.DISABLE_JOYSTYCK: {
      return { ...state, touchScreen: false }
    }

    case types.CLOSE_TUTORIAL: {
      return { ...state, showTutorial: false }
    }

    case types.JOYSTYCK_REVERT: {
      return { ...state, joystickRevert: !state.joystickRevert }
    }

    case types.CHANGE_JOYSTYCK: {
      if (action?.payload?.size && (action?.payload?.size < 20 || action?.payload?.size > 400)) return state;
      if (action?.payload?.sensibility && (action?.payload?.sensibility > 100 || action?.payload?.size < 0.01)) return state;
      return {
        ...state,
        joystickSize: action?.payload?.size ?? state.joystickSize,
        joystickSensibility: action?.payload?.sensibility ?? state.joystickSensibility
      }
    }

    default: {
      console.log({ ...action });
    }
  }
}
