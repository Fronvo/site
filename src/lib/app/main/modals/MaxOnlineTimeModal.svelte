<script lang="ts">
    import { sessionTime, sessionWarningShown } from 'stores/global';
    import { dismissModal } from 'utilities/app/main';
    import { getKey } from 'utilities/global';

    function resetSession(): void {
        $sessionTime = 0;
        $sessionWarningShown = false;

        dismissModal();
    }
</script>

<div class="online-container">
    <div class="header-container">
        <h1 id="header">Max online time reached</h1>
    </div>

    <hr />

    <div class="data-container">
        <h1>
            You have reached your maximum online time allowance of <span
                >{getKey('maxOnlineTime') / 60}</span
            > minute(s).
        </h1>
        <h1>
            You should exit Fronvo now but you can also reset the session time.
        </h1>
    </div>

    <button id="reset" on:click={resetSession}>Reset session</button>
</div>

<style>
    hr {
        width: 100px;
    }

    .online-container {
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
        text-align: center;
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
        align-items: center;
    }

    .data-container h1 {
        font-size: 2.4rem;
        text-align: center;
    }

    .data-container h1 span {
        color: white;
    }

    #reset {
        font-size: 2.2rem;
        margin-bottom: 15px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        .data-container h1 {
            font-size: 1.9rem;
        }

        #reset {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .data-container h1 {
            font-size: 1.6rem;
        }

        #reset {
            font-size: 1.5rem;
        }
    }
</style>
