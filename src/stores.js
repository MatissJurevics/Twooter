import { writable } from "svelte/store";
import Cookies from "js-cookie";

export const theme = writable(Cookies.get("theme"));
