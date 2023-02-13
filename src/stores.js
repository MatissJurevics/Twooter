import { writable } from "svelte/store";
import Cookies from "js-cookie";

export const theme = writable(Cookies.get("theme"));
export const user = writable({});
export const twoots = writable([]);
