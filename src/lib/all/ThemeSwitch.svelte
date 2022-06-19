<script lang="ts">
    import type { ThemeContext } from 'interfaces/global';
    import { getContext } from 'svelte';
    import Switch from 'svelte-switch';

    let { toggle, current }: ThemeContext = getContext('theme');
</script>

<Switch
    checked={$current == 'dark'}
    on:change={toggle}
    onColor={'#0e0e0e'}
    offColor={'#e6e6e6'}
    height="32"
    width="64"
    offHandleColor={'#ffffff'}
    onHandleColor={'#000000'}
    handleDiameter={1}
    boxShadow={null}
    activeBoxShadow={null}
>
    <!-- Custom switch state icons -->
    <svg
        slot="unCheckedIcon"
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        ><style></style><path
            d="m22.2 27.3q-2.6 1.2-5.5 1.2-2.7 0-5.1-1-2.4-1-4.2-2.7-1.7-1.6-2.8-3.9-1-2.4-1-4.9 0-4.2 2.6-7.5 2.6-3.3 6.7-4.5-2.1 3.3-2.1 7 0 3.6 1.8 6.6 1.9 3 5 4.8 3.2 1.7 6.9 1.7 1.1 0 2.2-0.1-1.8 2.1-4.5 3.3zm8.8-5.8q-0.1-0.3-0.4-0.6-0.6-0.6-1.5-0.3-2.2 1-4.6 1-3 0-5.6-1.4-2.5-1.4-4-3.9-1.5-2.4-1.5-5.3 0-2.2 0.9-4.3 0.9-2 2.7-3.5 0.7-0.6 0.3-1.4-0.3-0.8-1.2-0.8-3.2 0.1-5.9 1.4-2.8 1.2-4.8 3.2-2.1 2-3.2 4.7-1.2 2.7-1.2 5.7 0 3 1.2 5.8 1.3 2.8 3.4 4.8 2.1 2 5 3.2 2.9 1.2 6.1 1.2 4.5 0 8.4-2.4 3.8-2.3 5.8-6.3 0.1-0.4 0.1-0.8z"
        /></svg
    >

    <svg
        slot="checkedIcon"
        fill="white"
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        ><style></style><path
            d="m22.2 27.3q-2.6 1.2-5.5 1.2-2.7 0-5.1-1-2.4-1-4.2-2.7-1.7-1.6-2.8-3.9-1-2.4-1-4.9 0-4.2 2.6-7.5 2.6-3.3 6.7-4.5-2.1 3.3-2.1 7 0 3.6 1.8 6.6 1.9 3 5 4.8 3.2 1.7 6.9 1.7 1.1 0 2.2-0.1-1.8 2.1-4.5 3.3zm8.8-5.8q-0.1-0.3-0.4-0.6-0.6-0.6-1.5-0.3-2.2 1-4.6 1-3 0-5.6-1.4-2.5-1.4-4-3.9-1.5-2.4-1.5-5.3 0-2.2 0.9-4.3 0.9-2 2.7-3.5 0.7-0.6 0.3-1.4-0.3-0.8-1.2-0.8-3.2 0.1-5.9 1.4-2.8 1.2-4.8 3.2-2.1 2-3.2 4.7-1.2 2.7-1.2 5.7 0 3 1.2 5.8 1.3 2.8 3.4 4.8 2.1 2 5 3.2 2.9 1.2 6.1 1.2 4.5 0 8.4-2.4 3.8-2.3 5.8-6.3 0.1-0.4 0.1-0.8z"
        /></svg
    >
</Switch>

<style>
</style>
