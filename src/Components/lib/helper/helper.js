export const inactiveAll = (arrayObjs) => arrayObjs?.forEach(obj => obj.active = false);

export const filterActives = (arrayObjs) => arrayObjs?.filter(obj => obj.active);

export function getBoundingCoordinates(obj) {
  const top = obj.position.y + obj.height / 2;
  const bottom = obj.position.y - obj.height / 2;
  const left = obj.position.x;
  const right = obj.position.x + obj.width;
  return { top, bottom, left, right };
}

export function calcCollapse(objToCollapse, collapse) {
  if (!collapse?.position || !objToCollapse?.position) {
    return false;
  }

  const toCollapseCoords = getBoundingCoordinates(objToCollapse);
  const collapseCoords = getBoundingCoordinates(collapse);

  const isCollapsed =
    toCollapseCoords.top >= collapseCoords.bottom &&
    toCollapseCoords.bottom <= collapseCoords.top &&
    toCollapseCoords.left <= collapseCoords.right &&
    toCollapseCoords.right >= collapseCoords.left;

  return isCollapsed;
}
