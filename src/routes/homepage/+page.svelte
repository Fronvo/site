<script lang="ts">
    import { activeDashboardTab } from 'stores/dashboard';
    import { indexVisible } from 'stores/index';
    import {
        cachedAccountData,
        currentToken,
        loginSucceeded,
        showLayout,
    } from 'stores/main';
    import { onMount } from 'svelte';
    import { DashboardOptions } from 'types/all';
    import { getKey } from 'utilities/global';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';

    onMount(async () => {
        if ($loginSucceeded) return;

        // Remove homepage for registered users
        if (getKey('token')) {
            const val = window.navigator.userAgent.toLowerCase();

            // Block access to mobile, get the app
            if (!(val.includes('android') || val.includes('iphone'))) {
                redirectApp();

                $currentToken = getKey('token');

                $activeDashboardTab = DashboardOptions.Dashboard;

                await performLogin(getKey('token'), $cachedAccountData);
                return;
            }
        }

        // Disable __layout in index
        $showLayout = false;

        // Default when accessed
        $indexVisible = true;
    });
</script>
