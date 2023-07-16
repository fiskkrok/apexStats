<script>
    import { onMount } from "svelte";
    
    let data;
    const platform = 'psn'; // platform value
    const playerId = 'fiskkrok'; // playerId value
  
    onMount(async () => {
      const response = await fetch(`https://apexstats.azurewebsites.net/?platform=${platform}&playerId=${playerId}`);
      data = await response.json();
    });
  </script>
  
  {#if data}
    <div>
      <h1>{data.data.platformInfo.platformUserHandle}</h1>
      <p>Level: {data.data.segments[0].stats.level.displayValue}</p>
      <!-- Rest of your data rendering -->
    </div>
  {:else}
    <div>Loading...</div>
  {/if}
  