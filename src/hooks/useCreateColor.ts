export const createColor = (row: any) => {
  if (!row.cid) return [];
  const { cid, creator, id } = row;
  let str = `${cid}${creator}${id}`.toLowerCase();
  let prefix = str.replace(/\D/g, "");
  let suffix = str.replace(/[^abcdef]/g, "");
  str = prefix + suffix;
  if (str.length < 96) {
    let count = 96 / str.length;
    while (count >= 0) {
      str += str;
      count--;
    }
  }
  str = str.slice(0, 96);
  const colorArr = [];
  for (let i = 0; i < str.length; i += 6) {
    colorArr.push(`#${str.slice(i, i + 6)}`);
  }
  return colorArr;
};
