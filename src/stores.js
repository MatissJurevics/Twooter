import { writable } from "svelte/store";
import Cookies from "js-cookie";

export const theme = writable(Cookies.get("theme"));
export const user = writable({});
export const twoots = writable(["This is a test post to see how well the post feature will work. This post will be more than 1 line long in order to see just how well the overflow works."]);
