<script>
    import { scale } from 'svelte/transition';
</script>

<div in:scale={{duration: 1000, start: .95}} class='homepage-panel'>
    <h1 class='header-section'>The only social media app you will need.</h1>
    <h2 class='header-descriptor'>Everything you need to do, all in one platform.</h2>

    <div in:scale={{delay: 750, duration: 1000, start: .95}}>
        <h1 class='header-section'>Free and open source.</h1>
        <h2 class='header-descriptor'>No tracking, no advertising. Get away from Big Data.</h2>
    </div>

    <div in:scale={{delay: 1500, duration: 1000, start: .95}}>
        <h1 class='header-section'>What are you waiting for?</h1>
        <h2 class='header-descriptor' style='margin-bottom: 40px'>Jump onboard.</h2>
    </div>
</div>
