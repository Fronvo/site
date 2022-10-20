<script lang="ts">
    import { sessionTime, sessionWarningShown } from 'stores/all';
    import { dismissModal } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import Center from '$lib/app/Center.svelte';

    function resetSession(): void {
        $sessionTime = 0;
        $sessionWarningShown = false;

        dismissModal();
    }

    const data: ModalData = {
        title: 'Max online time',

        actions: [
            {
                title: 'Reset',
                callback: resetSession,
            },
        ],

        removeTransparency: true,
    };
</script>

<ModalTemplate {data}>
    <h1>
        You have reached your maximum online time allowance of <span
            >{getKey('maxOnlineTime') / 60}</span
        > minute(s).
    </h1>

    <h1>You should exit Fronvo now but you can also reset the session time.</h1>
</ModalTemplate>

<style>
    h1 {
        font-size: 2.4rem;
        text-align: center;
    }

    h1 span {
        color: var(--profile_info_color);
    }

    @media screen and (max-width: 720px) {
        h1 {
            font-size: 1.9rem;
        }
    }

    @media screen and (max-width: 520px) {
        h1 {
            font-size: 1.6rem;
        }
    }
</style>
