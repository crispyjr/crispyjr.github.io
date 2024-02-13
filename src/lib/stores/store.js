import { writable } from 'svelte/store';

export let selectedItem = writable({
    id: 0,
    name: '',
    description: '',
    start_time: '',
    end_time: '',
    cover: '',
    location: ''
});