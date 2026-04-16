/**
 * Binary search on SORTED array of numbers.
 * Assumes input array is sorted ascending.
 * Returns true if target found, false otherwise.
 */
const searchTarget = (arr: number[], target: number): boolean => {
  if (arr.length === 0) return false;

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      return true; // Found
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false; // Not found
};

export default function checkParticipants(
  participants: number[],
  newUserId: number,
): number[] {
  const isExist = searchTarget(participants, newUserId);

  if (isExist) {
    // Return sorted copy (preserve sort)
    return [...participants].sort((a, b) => a - b);
  }

  // Add new user and sort
  const newParticipants = [...participants, newUserId].sort((a, b) => a - b);
  return newParticipants;
}
