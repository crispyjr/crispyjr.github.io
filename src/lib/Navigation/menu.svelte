<script>
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';

    export let open;
</script>

<link href="https://fonts.googleapis.com/css?family=Koulen" rel="stylesheet" />

{#if open}
    <div class="menuBox">
        {#each ['Events', 'About', 'Gallery', 'Sign-Up'] as link, i}
            <p transition:fly={{ y: -15, delay: 50 * i }}>
                {link}
            </p>
        {/each}
    </div>
    <hr transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />

{/if}

<style>
    :global(html) {
        background: #000000;
    }
    /* div {
        text-align: center;
        font-size: 1.5em;
        letter-spacing: 0.15em;
        padding: 1em;
        padding-top: 0;
        color: black;
        background: white;
    } */
    .menuBox{
        width:100%;
        text-align: center;
        font-size: 1.5em;
        font-family: 'Koulen';
        letter-spacing: 0.15em;
        padding: 1em;
        padding-top: 10px;
        color: white;
        background: black;

        
        
    }
    p {
        cursor: pointer;
        font-size: 30px;
        margin: 1rem auto;
    }
    p:hover {
        /* text-decoration: underline; */
        color:red;
    }
    hr{
        border: 1px solid red;
    }
    
</style>
