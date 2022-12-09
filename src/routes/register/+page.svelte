<script lang="ts">
    import { accountRegisterTab } from 'stores/account';
    import { showLayout } from 'stores/all';
    import { setTitle } from 'utilities/main';

    $showLayout = true;
    $accountRegisterTab = true;

    setTitle('Fronvo | Register');
</script>
