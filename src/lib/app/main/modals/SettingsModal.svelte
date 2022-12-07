<script lang="ts">
    import {
        darkTheme,
        dataSaver,
        sessionTime,
        sessionTimeEnabled,
        sessionWarningShown,
        xmasMode,
    } from 'stores/all';
    import Checkbox from 'svelte-checkbox';
    import { dismissModal } from 'utilities/main';
    import { getKey, removeKey, setKey } from 'utilities/global';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    let maxOnlineTime = getKey('maxOnlineTime') / 60 || 0;
    let tempDarkTheme = $darkTheme;
    let tempDataSaver = $dataSaver;
    let tempXmasMode = $xmasMode;

    function saveMaxOnlineTime(): void {
        const onlineTime = validateMaxOnlineTime() * 60;

        // Only if not the same value
        if (onlineTime != Number(getKey('maxOnlineTime'))) {
            if (onlineTime) {
                // In minutes
                setKey('maxOnlineTime', onlineTime);
                // Reset session stats
                $sessionTime = 0;
                $sessionWarningShown = false;
                $sessionTimeEnabled = true;
            } else {
                removeKey('maxOnlineTime');
                $sessionTimeEnabled = false;
            }
        }

        function validateMaxOnlineTime(): undefined | number {
            if (!maxOnlineTime) return;

            const onlineTime = Number(maxOnlineTime);

            // @ts-ignore
            if (onlineTime != NaN && onlineTime > 0) {
                return onlineTime;
            }
        }
    }

    function saveDarkTheme(): void {
        setKey('darkTheme', tempDarkTheme);
        $darkTheme = tempDarkTheme;
    }

    function saveDataSaver(): void {
        setKey('dataSaver', tempDataSaver);
        $dataSaver = tempDataSaver;
    }

    function saveXmasMode(): void {
        setKey('xmasMode', tempXmasMode);
        $xmasMode = tempXmasMode;
    }

    function saveSettings(): void {
        saveMaxOnlineTime();
        saveDarkTheme();
        saveDataSaver();
        saveXmasMode();

        dismissModal();
    }

    const data: ModalData = {
        title: 'Settings',

        actions: [
            {
                title: 'Save',
                callback: saveSettings,
            },
        ],

        removeTransparency: true,
    };
</script>

<ModalTemplate {data}>
    <div>
        <h1>Max online minutes</h1>
        <input bind:value={maxOnlineTime} maxlength={4} />
    </div>

    <div class="single-line">
        <h1>Dark theme</h1>
        <Checkbox
            bind:checked={tempDarkTheme}
            class="private-checkbox"
            size="2.7rem"
            primaryColor="var(--modal_checkbox_primary_color)"
            secondaryColor="var(--modal_checkbox_secondary_color)"
        />
    </div>

    <div class="single-line">
        <h1>Data saver</h1>
        <Checkbox
            bind:checked={tempDataSaver}
            class="private-checkbox"
            size="2.7rem"
            primaryColor="var(--modal_checkbox_primary_color)"
            secondaryColor="var(--modal_checkbox_secondary_color)"
        />
    </div>

    <div class="single-line">
        <h1>Christmas mode</h1>
        <Checkbox
            bind:checked={tempXmasMode}
            class="private-checkbox"
            size="2.7rem"
            primaryColor="var(--modal_checkbox_primary_color)"
            secondaryColor="var(--modal_checkbox_secondary_color)"
        />
    </div>
</ModalTemplate>

<style>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }

    .single-line {
        flex-direction: row;
    }

    input {
        text-align: center;
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 18%;
        min-width: 100px;
        background: var(--modal_input_bg_color);
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    div h1 {
        margin: 0;
        margin-right: 15px;
        font-size: 2.4rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .single-line h1 {
        margin-right: 0;
    }

    @media screen and (max-width: 720px) {
        input {
            font-size: 1.7rem;
        }

        div h1 {
            font-size: 2.1rem;
        }
    }

    @media screen and (max-width: 520px) {
        input {
            font-size: 1.4rem;
        }

        div h1 {
            font-size: 1.8rem;
        }
    }
</style>
