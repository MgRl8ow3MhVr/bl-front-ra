import { fetchUtils } from "react-admin";
import { DataProvider } from "react-admin";
import { ApiData } from "./types/types";
import { apiUrl, mediaUrl } from "./config";
import { stat } from "fs";

const httpClient = fetchUtils.fetchJson;

const Tbd = async (resource: string, params: any) => {
  const { json, headers } = await httpClient("tbd", {
    signal: params.signal,
  });
  return {
    data: json,
    total: undefined,
  };
};

const customDataProvider: DataProvider = {
  getList: async (resource: string, params: any) => {
    let query = "";
    // pagination handling
    const { page, perPage } = params.pagination;
    query += `pagination[page]=${page}&pagination[pageSize]=${perPage}`;

    // populating handling (has to be generalized for any new table)
    query += "&populate[photo][fields][0]=url";

    // filter handling (has to be generalized for any new table - loop through params.filter)
    const { priceMax, priceMin, title, state } = params.filter;
    if (priceMax) {
      query += `&filters[price][$lt]=${priceMax}`;
    }
    if (priceMin) {
      query += `&filters[price][$gte]=${priceMin}`;
    }
    if (title) {
      query += `&filters[title][$contains]=${title}`;
    }
    if (state) {
      query += `&filters[state][$eq]=${state}`;
    }
    const url = `${apiUrl}/${resource}?${query}`;
    const { json } = await httpClient(url, { signal: params.signal });
    return {
      data: json.data.map((prod: ApiData) => {
        return {
          ...prod.attributes,
          id: prod.id,
          photoUrl: mediaUrl + prod.attributes.photo?.data?.attributes?.url,
        };
      }),
      total: json.meta.pagination.total,
    };
  },
  getOne: async (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    // populating handling (has to be generalized for any new table)
    let query = "?populate[photo][fields][0]=url";
    const { json } = await httpClient(url + query);
    console.log("start");
    await new Promise((res, rej) => {
      setTimeout(res, 2000);
    });
    console.log("cont");
    return {
      data: {
        ...json.data.attributes,
        id: json.data.id,
        photoUrl: mediaUrl + json.data.attributes.photo?.data?.attributes?.url,
      },
    };
  },
  getMany: Tbd,
  getManyReference: Tbd,
  create: Tbd,
  update: Tbd,
  updateMany: Tbd,
  delete: Tbd,
  deleteMany: Tbd,
};

export default customDataProvider;
