<script lang="ts">
    import {
        darkTheme,
        dataSaver,
        sessionTime,
        sessionTimeEnabled,
        sessionWarningShown,
    } from 'stores/all';
    import Checkbox from 'svelte-checkbox';
    import { dismissModal } from 'utilities/main';
    import { getKey, removeKey, setKey } from 'utilities/global';

    let maxOnlineTime = getKey('maxOnlineTime') / 60 || 0;
    let tempDarkTheme = $darkTheme;

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
        setKey('dataSaver', $dataSaver);
    }

    function saveSettings(): void {
        saveMaxOnlineTime();
        saveDarkTheme();
        saveDataSaver();

        dismissModal();
    }
</script>

<div class="settings-container">
    <div class="header-container">
        <h1 id="header">Settings</h1>
    </div>

    <hr />

    <div class="data-container">
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
                primaryColor="rgb(180, 120, 255)"
                secondaryColor="white"
            />
        </div>

        <div class="single-line">
            <h1>Data saver</h1>
            <Checkbox
                bind:checked={$dataSaver}
                class="private-checkbox"
                size="2.7rem"
                primaryColor="rgb(180, 120, 255)"
                secondaryColor="white"
            />
        </div>
    </div>

    <button id="close" on:click={saveSettings}>Save</button>
</div>

<style>
    hr {
        width: 100px;
    }

    .settings-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        overflow-y: auto;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        width: 50%;
        min-width: 500px;
    }

    .data-container div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }

    .data-container .single-line {
        flex-direction: row;
    }

    .data-container input {
        text-align: center;
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 18%;
        min-width: 100px;
        background: var(--modal_input_bg_color);
    }

    .data-container input::-webkit-outer-spin-button,
    .data-container input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    .data-container div h1 {
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

    .data-container .single-line h1 {
        margin-right: 0;
    }

    .data-container div button {
        font-size: 2.2rem;
    }

    #close {
        font-size: 2.2rem;
        margin-bottom: 15px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        .data-container {
            width: 400px;
            min-width: auto;
        }

        .data-container input {
            font-size: 1.7rem;
        }

        .data-container div h1 {
            font-size: 2.1rem;
        }

        .data-container div button {
            font-size: 1.8rem;
            cursor: default;
        }

        #close {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .data-container {
            width: 300px;
        }

        .data-container input {
            font-size: 1.4rem;
        }

        .data-container div h1 {
            font-size: 1.8rem;
        }

        .data-container div button {
            font-size: 1.5rem;
        }

        #close {
            font-size: 1.5rem;
        }
    }
</style>
