<script lang="ts">
    import {
        accountRegisterFinalTab,
        accountRegisterTab,
        accountRegisterVerifyTab,
    } from 'stores/account';
    import AccountButton from '../reusables/index/AccountButton.svelte';
    import AccountHeader from '../reusables/index/AccountHeader.svelte';
    import AccountInfo from '../reusables/index/AccountInfo.svelte';
    import AccountTemplate from '../reusables/index/AccountTemplate.svelte';

    function backToLogin(): void {
        $accountRegisterTab = false;
        $accountRegisterVerifyTab = false;
        $accountRegisterFinalTab = false;
    }
</script>

<AccountTemplate>
    <h1 id="header">Congrats!</h1>
    <AccountHeader>Congrats!</AccountHeader>

    <AccountInfo>
        Your account has been added to the waiting list so keep checking your
        email for any updates.</AccountInfo
    >

    <AccountButton callback={backToLogin}>Back to login</AccountButton>
</AccountTemplate>
