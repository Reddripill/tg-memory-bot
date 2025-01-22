export const transformWordPairs = (wordPairs: string): string[][] => {
   const pairsArr = wordPairs.split("\n").filter((item) => item.trim() !== "");
   return pairsArr.map((item) => item.split("-").map((word) => word.trim()));
};
