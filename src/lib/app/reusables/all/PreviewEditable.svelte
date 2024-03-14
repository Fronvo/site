<script lang="ts">
    import EditableBanner from '../profile/editable/EditableBanner.svelte';
    import EditableAvatar from '../profile/editable/EditableAvatar.svelte';
    import EditableIdentifier from '../profile/editable/EditableIdentifier.svelte';
    import EditableBio from '../profile/editable/EditableBio.svelte';
    import type { Writable } from 'svelte/store';
    import EditableConnections from '../profile/editable/EditableConnections.svelte';
    import { darkTheme } from 'stores/main';

    export let avatar: Writable<string>;
    export let username: Writable<string>;
    export let bio: Writable<string>;
    export let updateCallback: () => void;
</script>

<div class={`profile-container ${$darkTheme ? 'dark' : ''}`}>
    <EditableBanner {updateCallback} />
    <EditableAvatar {avatar} />

    <div class="secondary-container">
        <EditableIdentifier {username} />

        <span class="seperator" />

        <EditableBio {bio} />

        <span class="seperator" />

        <EditableConnections />
    </div>
</div>

<style>
    .profile-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--primary);
        backdrop-filter: blur(10px);
    }

    .secondary-container {
        width: 95%;
        display: flex;
        flex-direction: column;
        transform: translateY(-60px);
        background: rgb(225, 225, 225, 1);
        border-radius: 10px;
        padding-top: 10px;
        padding-bottom: 20px;
    }

    .dark .secondary-container {
        background: rgb(180, 180, 180, 0.05);
    }

    .seperator {
        margin: auto;
        width: 100%;
        height: 2px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>
