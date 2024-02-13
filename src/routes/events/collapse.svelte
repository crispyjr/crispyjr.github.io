<script>
     import {slide} from 'svelte/transition'
     export let month;
let collapseButton = '˅';
let visible=true;
const toggleCollapse = () => {
    visible = !visible;
    if(visible==true){
        collapseButton='˅'
    }
    else{
        collapseButton = '^';
    }
    console.log("moooooooo")
    

}
</script>

<div class="eventMonthTitleBar">
    <p class="eventMonthTitle">{month.toUpperCase()} </p>
    <div class="collapseButtonBox" on:click={toggleCollapse}><p class="collapseText">{collapseButton}</p></div>
</div>
<div>
    {#if visible}
    <div in:slide>
        <slot></slot>
    </div>
    {/if}
</div>

<style>
  .eventMonthTitleBar{
        width: 100%;
        height:100px;
        /* background: purple; */
        position: relative;
    }
    .eventMonthTitle{
        height:100%;
        /* background: pink; */
        position: absolute;
        font-family: 'Koulen';
        color: white;
        font-size: 70px;
        padding-left: 20px;
        position: relative;
        display: inline-block;
    }
    .collapseButtonBox{
        width: 50px;
        height:50px;
        /* background: pink; */
        position: relative;
        display: inline-block;
        font-size: 40px;
        color: white;
        align-items: end;
    }
    .collapseText{
        position: absolute;
        bottom: -18px;
        cursor: pointer;
    }

  
</style>