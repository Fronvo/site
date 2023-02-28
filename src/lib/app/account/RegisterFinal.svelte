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
        background-size: 200% auto;
        background-image: linear-gradient(
            to right,
            rgb(102, 0, 255) 0%,
            rgb(146, 73, 255) 51%,
            rgb(102, 0, 255) 100%
        );
        color: white;
    }

    .account-container button:hover {
        background-position: bottom center;
    }

    @media screen and (max-width: 700px) {
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
