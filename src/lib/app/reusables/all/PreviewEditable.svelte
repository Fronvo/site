<script lang="ts">
    import EditableBanner from '../profile/editable/EditableBanner.svelte';
    import EditableAvatar from '../profile/editable/EditableAvatar.svelte';
    import EditableIdentifier from '../profile/editable/EditableIdentifier.svelte';
    import EditableBio from '../profile/editable/EditableBio.svelte';
    import type { Writable } from 'svelte/store';

    export let avatar: Writable<string>;
    export let username: Writable<string>;
    export let bio: Writable<string>;
    export let updateCallback: () => void;
</script>

<div class="profile-container">
    <EditableBanner {updateCallback} />
    <EditableAvatar {avatar} online={true} />

    <div class="secondary-container">
        <EditableIdentifier {username} />

        <span class="seperator" />

        <EditableBio {bio} />
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
        background: rgb(100, 100, 100, 0.1);
        border-radius: 10px;
        padding-top: 10px;
        padding-bottom: 20px;
    }

    .seperator {
        margin: auto;
        width: 100%;
        height: 2px;
        margin-top: 20px;
        margin-bottom: 20px;
        background: var(--primary);
    }
</style>
