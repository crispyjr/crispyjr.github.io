<script>
    import image7 from '$lib/assets/event_template.png';
    import { convertDate } from '$lib/globalFunctions.js';
    export let showModal;
     export let title;
     export let category;
     export let location;
     export let time;
     export let item;

     function test(item){
        showModal = true;
    }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="eventBox" on:click={test(item)}>
    <!-- <img src={item?.cover} alt="" class="eventBoxImg" /> -->
    <img src="data:image/png;base64,{item?.cover}" class="eventBoxImg" alt={item?.name} />
    <div class="eventBoxTextBarTop">{item?.category}</div>
    <div class="eventBoxTextBarMiddle">
        {item?.name}
    </div>
    <div class="eventBoxTextBarBottom">
        <p>{item?.location}</p>
        <p> {convertDate(item?.start_time)}</p>
    </div>
</div>
<style>
.eventBox{
    width:358px;
    height:468px;
    background: white;
    position:relative;
    display: inline-block;
    margin:20px 0px 10px 30px;
    white-space: no-wrap;
}
.eventBoxImg{
    width:100%;
    height:100%;
    position: absolute;
    filter: blur(8px);
  -webkit-filter: blur(8px)
}
.eventBoxTextBarTop, .eventBoxTextBarMiddle, .eventBoxTextBarBottom{
    width:100%;
    position: absolute;
    text-align: center;
    font-family: 'Koulen';
    
    color:white;
}
.eventBoxTextBarMiddle{
    top:40%;
    font-size: 40px;
    height: 200px;
    line-height: 1;
    
 
}
.eventBoxTextBarTop{
    font-size: 60px;
}
.eventBoxTextBarBottom{
    bottom: 0;
    font-size: 25px;
    line-height: 1;
    height:65px;

}
</style>