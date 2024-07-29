/* eslint-disable default-case */
import { isArray, uniqueId } from 'lodash';
import { spaceshipsTypes } from '../gameAssets/functional/Sprites/spaceship/spaceshipsTypes.js';
import * as types from './types.js';
import { storageSaveRank } from '../Components/lib/helper/helper.js';

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

    case types.LOAD_RANK: {
      const data = action.payload?.ranks ?? [];
      const localRank = JSON.parse(localStorage.getItem("rank"));
      const rank = state.ranks ?? [];

      if(isArray(localRank)){
        data.push(...localRank);
      }

      data?.rank?.forEach((rankData) => {
        const { name, points, insertedDate, id } = rankData;

        if (!rank.map(r => r?.id)?.includes(id)) {
          rank.push({ rankName: name, points, insertedDate, id });
        }
      });

      return { ...state, ranks: rank }
    }

    case types.SAVE_RANK: {
      const data = action.payload ?? {};
      const ranks = state.ranks ?? [];

      const saveRank = async ({ name, points }) => {
        try {
          const res = await fetch(`http://localhost:4000/api/rank`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, points, insertedDate: new Date() })
          });

          if(res?.code > 400){
            storageSaveRank(name, points, {message: JSON.stringify(res)});
          }

          return res;
        } catch (err) {
          storageSaveRank(name, points, err);
          console.error(err);
          console.log(err);
          return err;
        }
      }

      saveRank(data);
      ranks.push({
        rankName: data.name,
        points: data.points,
        insertedDate: new Date()
      });

      return {
        ...state,
        ranks,
        points: 0,
        health: 100,
        level: 0,
        gameOver: false,
        initial: true,
        paused: true,
        showRank: true
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
      if (!action?.payload?.size || action?.payload?.size < 20 || action?.payload?.size > 400) return state;
      return { ...state, joystickSize: action?.payload?.size }
    }

    default: {
      console.log({ ...action });
    }
  }
}
