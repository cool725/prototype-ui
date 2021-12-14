<div class="p-2 space-y-2 rounded border border-gray-400 mb-2" transition:fade>
  <div>
    <div class="flex items-center mb-1">
      <p>Column Name</p> 
      {#if isCreate === 'alter'}
        <div class="flex items-center ml-auto border-b-2 border-gray-400">
          <input
            name={objAttributes.id}
            type="radio"
            value="add"
            class="mr-2 rounded-full"
            bind:group={objAttributes.alterColumnStatus}
          />
          <p class="mr-4">ADD</p>
          
          <input
            name={objAttributes.id}
            type="radio"
            value="drop"
            class="mr-2 rounded-full"
            bind:group={objAttributes.alterColumnStatus}
          />
          <p class="mr-4">DROP</p>
          
          <input
            name={objAttributes.id}
            type="radio"
            class="mr-2 rounded-full"
            value="rename"
            bind:group={objAttributes.alterColumnStatus}
          />
          <p>RENAME</p>
        </div>
      {/if}
    </div>

    {#if isCreate === 'create'}
      <input
        class="input-base"
        placeholder="column_name..."
        on:input={handleChange}
        bind:value={objAttributes.column_name}
      />
      {:else}
      <select class="input-base mb-3" bind:value={objAttributes.column_name}>
        <option selected disabled value="">Column...</option>
        <option>Column_1</option>
        <option>Column_2</option>
      </select>
    {/if}

    {#if isCreate === 'alter' && objAttributes.alterColumnStatus === 'rename'}
      <p>New Column Name</p>

      <input
        class="input-base"
        placeholder="New Column Name..."
        bind:value={objAttributes.new_column_name}
      />
    {/if}
  </div>

  <div class="grid grid-cols-2 gap-2">
    {#if objAttributes.alterColumnStatus === 'add'}
      <div>
        <p>Data Type</p>
        <select
          class="input-base"
          bind:value={objAttributes.data_type}
          on:input={handleChangeDataType}
        >
          <option selected value="" disabled>Data Type...</option>
          <option value="text">text</option>
          <option value="int">int</option>
          <option value="boolean">boolean</option>
          <option value="date">date</option>
          <option value="float8">float8</option>
          <option value="serial">serial</option>
          <option value="time">time</option>
          <option value="timestamp">timestamp</option>
          <option value="timez">timez</option>
          <option value="timestampz">timestampz</option>
          <option value="uuid">uuid</option>
          <option value="other">Other Type...</option>
        </select>
      </div>
      <div>
        <p>Default Value</p>
        {#if objAttributes.data_type === 'boolean'}
          <select class="input-base" bind:value={objAttributes.default}>
            <option selected disabled value="">Default value...</option>
            <option value="FALSE">False</option>
            <option value="TRUE">True</option>
          </select>
        {:else}
          <input class="input-base" placeholder="column_name..." bind:value={objAttributes.default} />
        {/if}
      </div>
    {/if}
  </div>
  
  <!-- Custom data type - added if other type selected above -->
  {#if isOtherType}
  <div class="p-2 rounded border border-gray-400 shadow mb-2">
    <p>Other Data Type</p>
    <input class="input-base" placeholder="column_name..." bind:value={objAttributes.other} />
  </div>
  {/if}

  {#if objAttributes.alterColumnStatus === 'add'}
    <div class="flex items-center mt-2">
      <input type="checkbox" class="mr-2 rounded" bind:checked={objAttributes.is_nullable} />
      <p class="mr-4">Nullable</p>
      <input type="checkbox" class="mr-2 rounded" bind:checked={objAttributes.is_unique} />
      <p class="mr-4">Unique</p>
      <button class="ml-auto btn-default text-sm text-red-700" on:click={removeComponent}>Remove Column</button>
    </div>
  {/if}
</div>

<script>
  export let objAttributes = {};
  export let isCreate = 'create';
  import { fade } from 'svelte/transition';
  import { storeColumnsForCreate } from '../store.js';

  let isOtherType = false;

  $: if (objAttributes.data_type === 'other') {
    isOtherType = true;
  } else {
    isOtherType = false;
  }

  function removeComponent() {
    $storeColumnsForCreate = $storeColumnsForCreate.filter(function(value, index, arr){ 
      if (value.id != objAttributes.id) return value;
    });
    console.log($storeColumnsForCreate)
  }

  function handleChange(e) {
    objAttributes.column_name = e.target.value;
    $storeColumnsForCreate = $storeColumnsForCreate;
  }

  function handleChangeDataType(e) {
    objAttributes.data_type = e.target.value;
    objAttributes.default = '';
    $storeColumnsForCreate = $storeColumnsForCreate;
  }
</script>