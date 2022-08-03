/// <reference types="svelte" />

declare module 'svelte-checkbox' {
    import type { SvelteComponentTyped } from 'svelte';

    export default class Checkbox extends SvelteComponentTyped<{
        size?: string;
        name?: string;
        id?: string;
        class?: string;
        primaryColor?: string;
        secondaryColor?: string;
        checked?: boolean;
    }> {}
}
