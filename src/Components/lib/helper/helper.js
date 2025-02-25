import { uniqueId } from "lodash";
import { addRank } from "../../../firestore_utils.js";

export const inactiveAll = (arrayObjs) => arrayObjs?.forEach(obj => obj.active = false);

export const filterActives = (arrayObjs) => arrayObjs?.filter(obj => obj.active);

export function getBoundingCoordinates(obj) {
  const top = obj.position.y - obj.height / 2;
  const bottom = obj.position.y + obj.height / 2;
  const right = obj.position.x + obj.width / 2;
  const left = obj.position.x - obj.width / 2;
  return { top, bottom, left, right };
}

export function calcCollapse(objToCollapse, shot) {
  if (!shot?.position || !objToCollapse?.position) {
    return false;
  }

  const toCollapseCoords = getBoundingCoordinates(objToCollapse);
  const shotCoords = {
    top: shot.position.y - shot.width / 2,
    bottom: shot.position.y + shot.width / 2,
    left: shot.position.x - shot.width / 2,
    right: shot.position.x + shot.width / 2
  };

  const isCollapsed = (
    shotCoords.bottom >= toCollapseCoords.top &&
    shotCoords.top <= toCollapseCoords.bottom &&
    shotCoords.right >= toCollapseCoords.left &&
    shotCoords.left <= toCollapseCoords.right
  );

  return isCollapsed;
}

export function storageSaveRank(name, points, err) {
  const storageRank = JSON.parse(window.localStorage.getItem("rank")) ?? [];
  storageRank.push({
    name, points,
    insertedDate: new Date(),
    saved: false,
    error: err?.message,
    id: uniqueId(`${name}${points}${new Date().toString()}`)
  });

  window.localStorage.setItem("rank", JSON.stringify(storageRank));
}

export const saveRank = async ({ name, points, spaceShipId, level, totalSeconds, startedTime, touchScreen }) => {
  try {
    const rankToSave = {
      name,
      points,
      spaceshipid: spaceShipId,
      level: level,
      time: totalSeconds,
      startedTime: startedTime,
      isMobile: touchScreen
    };

    const res = await addRank(rankToSave);

    if (res?.code > 400) {
      storageSaveRank(name, points, { message: JSON.stringify(res) });
    }

    return { ...rankToSave, ...res };
  } catch (err) {
    storageSaveRank(name, points, err);
    console.error(err);
    console.log(err);
    return err;
  }
}
