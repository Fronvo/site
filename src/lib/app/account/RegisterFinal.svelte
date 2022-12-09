<script lang="ts">
    import {
        accountPanelAnimDuration,
        accountRegisterFinalTab,
        accountRegisterTab,
        accountRegisterVerifyTab,
    } from 'stores/account';
    import { scale } from 'svelte/transition';

    function backToLogin(): void {
        $accountRegisterTab = false;
        $accountRegisterVerifyTab = false;
        $accountRegisterFinalTab = false;
    }
</script>

<div
    class="account-container"
    transition:scale={{ duration: accountPanelAnimDuration, start: 1.1 }}
>
    <h1 id="header">Congrats!</h1>

    <h1 id="congrats">
        Your account has been added to the waiting list so keep checking your
        email for any updates.
    </h1>

    <br />

    <button id="register-button" on:click={backToLogin}>Back to login</button>
</div>

<style>
    .account-container {
        position: fixed;
        border-radius: 10px;
        background: rgb(111, 28, 236);
        padding: 20px 30px 20px 30px;
        box-shadow: 0 0 5px black;
        text-align: center;
        width: 550px;
    }

    .account-container #header {
        color: white;
        text-align: center;
        font-size: 3rem;
        margin: 10px 10px 20px 10px;
    }

    .account-container #congrats {
        color: white;
        font-size: 2.2rem;
        margin: 0;
        width: 100%;
    }

    .account-container button {
        font-size: 2.5rem;
        margin-top: 15px;
        width: 90%;
        border: 3px solid white;
        padding: 7px;
    }

    @media screen and (max-width: 720px) {
        .account-container {
            width: 450px;
        }

        .account-container #header {
            font-size: 2.5rem;
        }

        .account-container #congrats {
            font-size: 1.9rem;
        }

        .account-container button {
            font-size: 2.2rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .account-container {
            width: 350px;
        }

        .account-container #header {
            font-size: 1.8rem;
        }

        .account-container #congrats {
            font-size: 1.5rem;
        }

        .account-container button {
            font-size: 1.7rem;
        }
    }
</style>
