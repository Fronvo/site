<script lang="ts">
    import { page } from '$app/stores';
    import { indexVisible } from 'stores/index';
    import {
        cachedAccountData,
        currentToken,
        loginSucceeded,
        showLayout,
    } from 'stores/main';
    import { pendingProfileDMId } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';

    onMount(async () => {
        if ($loginSucceeded) return;

        if (getKey('token')) {
            redirectApp();

            $currentToken = getKey('token');

            $pendingProfileDMId = $page.params.profileId;

            await performLogin(getKey('token'), $cachedAccountData);

            return;
        } else {
            // Disable __layout in index
            $showLayout = false;

            // Default when accessed
            $indexVisible = true;
        }
    });
</script>
