<script>
    import { scale } from 'svelte/transition';
</script>

<div transition:scale={{start: 0.98, duration: 500}} class='fronvo-panel'>
    <div class='panel-top'>
        <div id='content'>
            <svg version='1.2' baseProfile='tiny-ps' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='48' height='48'>
                <defs>
                    <linearGradient id='grd4' gradientUnits='userSpaceOnUse'  x1='2' y1='45.5' x2='47' y2='3.5'>
                        <stop offset='0' stop-color='#ac08dd'  />
                        <stop offset='0' stop-color='#bf00eb'  />
                        <stop offset='1' stop-color='#ff00dd'  />
                    </linearGradient>
                </defs>
                <style>
                    tspan { white-space:pre }
                    .shp4 { fill: url(#grd4);stroke: #ffffff;stroke-width: 0 } 
                </style>
                <path class='shp4' d='m47 39.41c0 2.34-0.78 4.19-2.33 5.55c-1.56 1.36-3.62 2.04-6.2 2.04h-27.93c-2.58 0-4.65-0.68-6.2-2.04c-1.56-1.36-2.33-3.21-2.33-5.55c0-1.04 0.04-2.05 0.11-3.03c0.07-0.99 0.22-2.05 0.45-3.19c0.22-1.14 0.51-2.2 0.85-3.18c0.34-0.98 0.8-1.93 1.37-2.86c0.58-0.93 1.24-1.72 1.98-2.37c0.75-0.65 1.66-1.18 2.73-1.57c1.08-0.39 2.26-0.59 3.56-0.59c0.19 0 0.64 0.21 1.34 0.63c0.7 0.42 1.5 0.89 2.38 1.41c0.88 0.52 2.03 0.99 3.45 1.41c1.42 0.42 2.84 0.63 4.27 0.63c1.43 0 2.85-0.21 4.27-0.63c1.42-0.42 2.57-0.89 3.45-1.41c0.88-0.52 1.68-0.99 2.38-1.41c0.7-0.42 1.15-0.63 1.34-0.63c1.3 0 2.49 0.2 3.56 0.59c1.08 0.39 1.99 0.91 2.73 1.57c0.75 0.65 1.41 1.45 1.98 2.37c0.58 0.93 1.03 1.88 1.37 2.86c0.34 0.98 0.62 2.04 0.85 3.18c0.22 1.14 0.37 2.21 0.45 3.19c0.07 0.99 0.11 2 0.11 3.03zm-22.5-37.41c-3.39 0-6.28 1.1-8.68 3.3c-2.4 2.2-3.6 4.85-3.6 7.95c0 3.11 1.2 5.76 3.6 7.95c2.4 2.2 5.29 3.3 8.68 3.3c3.39 0 6.28-1.1 8.68-3.3c2.4-2.2 3.6-4.85 3.6-7.95c0-3.11-1.2-5.76-3.6-7.95c-2.4-2.2-5.29-3.3-8.68-3.3z' />
            </svg>

            <h1 id='title'>Profile</h1>
        </div>
    </div>

    <h1>Coming soon...</h1>
</div>
