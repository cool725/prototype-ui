<script>
  import { Link } from "svelte-navigator";
  import { fade } from 'svelte/transition';

  // Icons
  import Icon from 'svelte-icons-pack/Icon.svelte'
  import BiData from 'svelte-icons-pack/bi/BiData'
  import BiCodeAlt from 'svelte-icons-pack/bi/BiCodeAlt'
  import BiNetworkChart from 'svelte-icons-pack/bi/BiNetworkChart'
  import BiCog from 'svelte-icons-pack/bi/BiCog'

  let pluginDropdown = false
  
  export let headerActive
  export let subheaderActive
</script>

<svelte:window on:click={() => (pluginDropdown = false)} />

<header class="flex items-center px-3 bg-gray-200">
  <div class="flex items-center py-2 px-0.5">
    <Link to="/graphql"><div class="{headerActive === 'api' ? 'text-gray-900 bg-gray-300' : 'text-gray-500'} flex items-center py-1 px-3 font-medium rounded hover:text-gray-900 hover:bg-gray-300">
      <Icon src={BiCodeAlt} size="18" className="fill-current mr-1" title="API" />
      <p>API</p>
    </div></Link>
  </div>
  <div class="flex items-center py-2 px-0.5">
    <Link to="/data"><div class="{headerActive === 'data' ? 'text-gray-900 bg-gray-300' : 'text-gray-500'} flex items-center py-1 px-3 font-medium rounded hover:text-gray-900 hover:bg-gray-300">
      <Icon src={BiData} size="18" className="fill-current mr-1" title="Data" />
      Data
    </div></Link>
  </div>
  <!-- <div class="flex items-center py-2 px-0.5">
    <Link to=""><div class="{headerActive === 'federate' ? 'text-gray-900 bg-gray-300' : 'text-gray-500'} flex items-center py-1 px-3 font-medium rounded hover:text-gray-900 hover:bg-gray-300" >
      <Icon src={BiNetworkChart} size="18" className="fill-current mr-1" title="Federation" />
      Federation
    </div></Link>
  </div> -->
  <div class="ml-auto flex items-center py-2 px-0.5">
    <Link to=""><div class="{headerActive === 'federate' ? 'text-gray-900 bg-gray-300' : 'text-gray-500'} flex items-center py-1 px-3 font-medium rounded hover:text-gray-900 hover:bg-gray-300" >
      <Icon src={BiCog} size="18" className="fill-current mr-1" title="Settings" />
      Settings
    </div></Link>
  </div>
</header>

<nav class="flex items-center font-medium px-3 bg-gray-100 border-b border-gray-400 -mb-px z-20">
  {#if headerActive === 'api'}
  <Link to=""><div class="{subheaderActive === 'compose' ? 'text-gray-900 border-gray-400' : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'} flex items-center py-2 px-2 border-b-2" >
    Compose Query
  </div></Link>
  <!-- <Link to=""><div class="{subheaderActive === 'collections' ? 'text-gray-900 border-gray-400' : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'} flex items-center py-2 px-2 border-b-2" >
    Query Collections
  </div></Link>
  <Link to=""><div class="{subheaderActive === 'rest' ? 'text-gray-900 border-gray-400' : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'} flex items-center py-2 px-2 border-b-2" >
    REST Endpoints
  </div></Link> -->

  <!--
  <div class="ml-auto relative">
    <div on:click|stopPropagation={() => (pluginDropdown = !pluginDropdown)} class="cursor-pointer flex items-center py-2 px-2 text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 mr-1 fill-current"><path d="M19 10V7c0-1.103-.897-2-2-2h-3c0-1.654-1.346-3-3-3S8 3.346 8 5H5c-1.103 0-2 .897-2 2v3.881l.659.239C4.461 11.41 5 12.166 5 13s-.539 1.59-1.341 1.88L3 15.119V19c0 1.103.897 2 2 2h3.881l.239-.659C9.41 19.539 10.166 19 11 19s1.59.539 1.88 1.341l.239.659H17c1.103 0 2-.897 2-2v-3c1.654 0 3-1.346 3-3s-1.346-3-3-3zm0 4h-2l-.003 5h-2.545c-.711-1.22-2.022-2-3.452-2s-2.741.78-3.452 2H5v-2.548C6.22 15.741 7 14.43 7 13s-.78-2.741-2-3.452V7h5V5a1 1 0 0 1 2 0v2h5v5h2a1 1 0 0 1 0 2z"></path></svg>
      Plugins
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 ml-0.5 fill-current"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
    </div>
    {#if pluginDropdown} 
    <div transition:fade="{{duration: 100}}" class="z-30 absolute bg-gray-700 shadow-lg text-gray-50 p-2 top-2 right-3 rounded min-w-max">
      <div class="px-2 py-1 text-mono text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Installed Plugins
      </div>
      <div class="rounded px-2 py-1 hover:bg-gray-900">
        <a >GraphiQL</div></Link>
      </div>
    </div>
    {/if}
  </div>
  <Link to=""><div class="flex items-center py-2 px-2 text-gray-500 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-300" >
    API Options
  </div></Link> -->
  {/if}

  {#if headerActive === 'data'}
  <Link to=""><div class="{subheaderActive === 'compose' ? 'text-gray-900 border-gray-400' : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'} flex items-center py-2 px-2 border-b-2" >
    Query Console
  </div></Link>
  <Link to=""><div class="{subheaderActive === 'tracking' ? 'text-gray-900 border-gray-400' : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'} flex items-center py-2 px-2 border-b-2" >
    Tracking
  </div></Link>
  <!-- <Link to=""><div class="{subheaderActive === 'relationships' ? 'text-gray-900 border-gray-400' : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'} flex items-center py-2 px-2 border-b-2" >
    Relationships
  </div></Link>
  <Link to=""><div class="{subheaderActive === 'permissions' ? 'text-gray-900 border-gray-400' : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'} flex items-center py-2 px-2 border-b-2" >
    Permissions
  </div></Link>
  <Link to=""><div class="{subheaderActive === 'events' ? 'text-gray-900 border-gray-400' : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300'} flex items-center py-2 px-2 border-b-2" >
    Events
  </div></Link> -->
  {/if}
</nav>