/* eslint-disable @typescript-eslint/no-explicit-any */
export const sortList = (data: any, byNmber?: boolean) => {
  if (data.length === 0) {
    return data;
  } else if (byNmber) {
    return data.sort((a: any, b: any) => a.equinorCode - b.equinorCode);
  } else if (data.length !== 0 && data[0]['identifier'] !== undefined) {
    return data.sort((a: any, b: any) =>
      a.identifier.localeCompare(b.identifier),
    );
  } else if (data[0]['name'] !== undefined) {
    return data.sort((a: any, b: any) => a.name.localeCompare(b.name));
  } else {
    return data;
  }
};
