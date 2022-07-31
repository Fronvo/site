<script lang="ts">
    import type { ThemeContext } from 'interfaces/global';
    import { getContext } from 'svelte';

    let { current }: ThemeContext = getContext('theme');
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width="40"
    height="40"
    ><style>
        .delete-white {
            fill: #fff;
        }

        .delete-black {
            fill: #000;
        }
    </style><path
        class={$current == 'dark' ? 'delete-white' : 'delete-black'}
        d="m15 31.9q-0.2 0.3-0.6 0.3h-1.6q-0.3 0-0.5-0.3-0.3-0.2-0.3-0.5v-17.3q0-0.3 0.3-0.5 0.2-0.2 0.5-0.2h1.6q0.4 0 0.6 0.2 0.2 0.2 0.2 0.5v17.3q0 0.3-0.2 0.5zm6.4 0q-0.3 0.3-0.6 0.3h-1.6q-0.3 0-0.6-0.3-0.2-0.2-0.2-0.5v-17.3q0-0.3 0.2-0.5 0.3-0.2 0.6-0.2h1.6q0.3 0 0.6 0.2 0.2 0.2 0.2 0.5v17.3q0 0.3-0.2 0.5zm6.3 0q-0.2 0.3-0.5 0.3h-1.6q-0.4 0-0.6-0.3-0.2-0.2-0.2-0.5v-17.3q0-0.3 0.2-0.5 0.2-0.2 0.6-0.2h1.6q0.3 0 0.5 0.2 0.3 0.2 0.3 0.5v17.3q0 0.3-0.3 0.5zm-12.1-27.7q0.2-0.2 0.5-0.2h7.9q0.2 0 0.4 0.2l1.2 2.9h-11.2zm21.7 3.1q-0.3-0.2-0.6-0.2h-7.7l-1.7-4.1q-0.4-0.9-1.4-1.6-0.9-0.6-1.9-0.6h-8q-1 0-2 0.6-0.9 0.7-1.3 1.6l-1.7 4.1h-7.7q-0.4 0-0.6 0.2-0.2 0.2-0.2 0.5v1.6q0 0.4 0.2 0.6 0.2 0.2 0.6 0.2h2.4v23.3q0 2 1.1 3.5 1.2 1.4 2.8 1.4h20.7q1.7 0 2.8-1.5 1.2-1.5 1.2-3.5v-23.2h2.4q0.3 0 0.6-0.2 0.2-0.2 0.2-0.6v-1.6q0-0.3-0.2-0.5z"
    /></svg
>

<style>
    @media screen and (max-width: 520px) {
        svg {
            width: 32px;
            height: 32px;
        }
    }
</style>
