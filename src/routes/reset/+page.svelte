<script lang="ts">
    import { accountResetPasswordTab } from 'stores/account';
    import { showLayout } from 'stores/all';
    import { setTitle } from 'utilities/main';

    $showLayout = true;
    $accountResetPasswordTab = true;

    setTitle('Fronvo | Reset password');
</script>
