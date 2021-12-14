import { writable } from 'svelte/store';

// For create and alter table
export let storeColumnsForCreate = writable({});
export let idIncrementForCreate = writable({});

// For select table
export let storeColumnsForSelect = writable({});
export let idIncrementForSelect = writable({});